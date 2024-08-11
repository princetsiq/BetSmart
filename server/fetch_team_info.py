import sys
from bs4 import BeautifulSoup
import ssl
import certifi
from nba_api.stats.static import teams
from nba_api.stats.endpoints import commonteamroster, commonplayerinfo
import json
import aiohttp
import asyncio

async def fetch_logo(session, team):
    url = f"https://www.nba.com/team/{team.get('id')}"
    async with session.get(url) as response:
        content = await response.text()
        s = BeautifulSoup(content, 'html.parser')
        logo_div = s.find('div', class_='TeamHeader_logoBlock__WjNZB')
        logo_img = logo_div.find('img') if logo_div else None
        return {team.get('full_name'): logo_img['src'] if logo_img else None}

async def get_team_logos(teams):
    sslcontext = ssl.create_default_context(cafile=certifi.where())
    async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=sslcontext)) as session:
        tasks = {fetch_logo(session, team) for team in teams}
        results = await asyncio.gather(*tasks)
        logos = {k: v for d in results for k, v in d.items()}
        return logos

async def fetch_player_image(session, player_id):
    url = f'https://www.nba.com/player/{player_id}'
    async with session.get(url) as response:
        if response.status != 200:
            return player_id, ''
        content = await response.text()
        soup = BeautifulSoup(content, 'html.parser')
        image = soup.find('img', class_='PlayerImage_image__wH_YX PlayerSummary_playerImage__sysif')
        return image['src'] if image else ''

async def get_player_images(player_ids):
    sslcontext = ssl.create_default_context(cafile=certifi.where())
    async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=sslcontext)) as session:
        tasks = [fetch_player_image(session, player_id) for player_id in player_ids]
        results = await asyncio.gather(*tasks)
        return dict(zip(player_ids, results))

def get_player_details(team_id):
    try:
        roster = commonteamroster.CommonTeamRoster(team_id=team_id).get_data_frames()[0]
        player_details = []

        player_ids = roster['PLAYER_ID'].tolist()
        player_images = asyncio.run(get_player_images(player_ids))

        for player_id in player_ids:
            player_info = commonplayerinfo.CommonPlayerInfo(player_id=player_id).get_data_frames()
            player_info_data = player_info[0]
            player_stats = player_info[1]

            if player_info_data.empty or player_stats.empty: continue

            player_details.append({
                'id': player_id,
                'name': player_stats.loc[0, 'PLAYER_NAME'],
                'position': player_info_data.loc[0, 'POSITION'],
                'height': player_info_data.loc[0, 'HEIGHT'],
                'team_name': player_info_data.loc[0, 'TEAM_NAME'],
                'team_city': player_info_data.loc[0, 'TEAM_CITY'],
                'img': player_images.get(player_id, ''),
                'stats': {
                    'points': player_stats.loc[0, 'PTS'],
                    'assists': player_stats.loc[0, 'AST'],
                    'rebounds': player_stats.loc[0, 'REB'],
                }
            })

        return player_details
    except Exception as e:
        print(f'Error fetching player details: {e}')
        return []

if __name__ == '__main__':
    data_type = sys.argv[1]
    if data_type == 'logos':
        loop = asyncio.get_event_loop()
        logos = loop.run_until_complete(get_team_logos(teams.get_teams()))
        print(json.dumps(logos))
    elif data_type == 'players':
        team_id = sys.argv[2]
        details = get_player_details(team_id)
        print(json.dumps(details))