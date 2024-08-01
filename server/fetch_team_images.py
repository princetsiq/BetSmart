import sys
from bs4 import BeautifulSoup
import requests
from nba_api.stats.static import teams
from nba_api.stats.endpoints import commonteamroster, commonplayerinfo
import json

def get_team_logos():
    tms = teams.get_teams()
    logos = {}
    for tm in tms:
        url = f"https://www.nba.com/team/{tm.get('id')}"
        p = requests.get(url)
        s = BeautifulSoup(p.content, 'html.parser')
        
        logo_div = s.find('div', class_='TeamHeader_logoBlock__WjNZB')
        logo_img = logo_div.find('img') if logo_div else None

        if logo_img:
            logos[tm.get('full_name')] = logo_img['src']
        else:
            logos[tm.get('full_name')] = None
    return logos

def get_player_details(team_id=1610612737):
    roster = commonteamroster.CommonTeamRoster(team_id=team_id).get_data_frames()[0]
    player_details = []

    for player_id in roster['PLAYER_ID']:
        player_info = commonplayerinfo.CommonPlayerInfo(player_id=player_id).get_data_frames()
        player_info_data = player_info[0]
        player_stats = player_info[1]

        url = f"https://www.nba.com/player/{player_id}"
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        image = soup.find('img', class_="PlayerImage_image__wH_YX PlayerSummary_playerImage__sysif")
        image_url = image['src'] if image else ""

        player_details.append({
            'id': player_id,
            'name': player_stats.loc[0, 'PLAYER_NAME'],
            'position': player_info_data.loc[0, 'POSITION'],
            'height': player_info_data.loc[0, 'HEIGHT'],
            'team_name': player_info_data.loc[0, 'TEAM_NAME'],
            'team_city': player_info_data.loc[0, 'TEAM_CITY'],
            'img': image_url,
            'stats': {
                'points': player_stats.loc[0, 'PTS'],
                'assists': player_stats.loc[0, 'AST'],
                'rebounds': player_stats.loc[0, 'REB'],
            }
        })
    return player_details


if __name__ == "__main__":
    data_type = sys.argv[1]
    if data_type == "logos":
        logos = get_team_logos()
        print(json.dumps(logos))
    elif data_type == "players":
        team_id = sys.argv[2]
        details = get_player_details(team_id)
        print(json.dumps(details))