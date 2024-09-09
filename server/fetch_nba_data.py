import sys
import json
from nba_api.stats.static import teams
from nba_api.stats.endpoints import leaguegamefinder
import requests
import asyncio
from fetch_team_info import get_team_logos

async def get_teams():
    try:
        nba_teams = teams.get_teams()
        team_logos = await get_team_logos(nba_teams)
        
        detailed_teams = []
        for team in nba_teams:
            team_abbreviation = team['abbreviation']
            team_logo = team_logos.get(team['full_name'], None)
            detailed_teams.append({
                'id': team['id'],  
                'full_name': team['full_name'],
                'abbreviation': team['abbreviation'],
                'nickname': team['nickname'],
                'city': team['city'],
                'state': team['state'],
                'year_founded': team['year_founded'],
                'logo_path': team_logo,
                'description': f'''The {team['full_name']} ({team_abbreviation})
                                    were founded in {team['year_founded']}. They're located
                                    in {team['city']}, {team['state']}. Their nickname is The
                                    {team['nickname']}.'''
            })
        return detailed_teams
    except requests.exceptions.RequestException as e:
        print(f'Request error: {e}')
        return []
    except Exception as e:
        print(f'Error fetching team data: {e}')
        return []
    
async def get_team_details(team_ids):
    try:
        nba_teams = teams.get_teams() 
        team_logos = await get_team_logos(nba_teams)

        detailed_teams = []
        for team_id in team_ids:
            team = next((t for t in nba_teams if t['id'] == int(team_id)), None)
            
            if not team:
                continue

            team_abbreviation = team['abbreviation']
            team_logo = team_logos.get(team['full_name'], None)
            detailed_teams.append({
                'id': team['id'],
                'full_name': team['full_name'],
                'abbreviation': team['abbreviation'],
                'nickname': team['nickname'],
                'city': team['city'],
                'state': team['state'],
                'year_founded': team['year_founded'],
                'logo_path': team_logo,
                'description': f'''The {team['full_name']} ({team_abbreviation})
                                    were founded in {team['year_founded']}. They're located
                                    in {team['city']}, {team['state']}. Their nickname is The
                                    {team['nickname']}.'''
            })
        return detailed_teams
    except requests.exceptions.RequestException as e:
        print(f'Request error: {e}')
        return []
    except Exception as e:
        print(f'Error fetching team data: {e}')
        return []

async def get_games(season='2013-14', season_type='Regular Season'):
    try:
        gamefinder = leaguegamefinder.LeagueGameFinder(
            season_nullable = season, 
            season_type_nullable = season_type, 
            league_id_nullable = '00'
        )

        games = gamefinder.get_data_frames()[0]
        nba_teams = teams.get_teams()
        team_logos = await get_team_logos(nba_teams)

        upcoming_games = []
        seen_game_ids = set()

        for _, game in games.iterrows():
            matchup = game['MATCHUP']
            if ' @ ' in matchup:
                home_team_abbreviation = matchup.split(' @ ')[1]
                away_team_abbreviation = matchup.split(' @ ')[0]
            elif ' vs. ' in matchup:
                home_team_abbreviation = matchup.split(' vs. ')[0]
                away_team_abbreviation = matchup.split(' vs. ')[1]

            home_team = teams.find_team_by_abbreviation(home_team_abbreviation)
            away_team = teams.find_team_by_abbreviation(away_team_abbreviation)

            game_identifier = f"{game['GAME_ID']}-{home_team_abbreviation}-{away_team_abbreviation}"

            if game_identifier in seen_game_ids: continue

            game_info = {
                'SEASON_ID': game['SEASON_ID'],
                'GAME_ID': game['GAME_ID'],
                'GAME_DATE': game['GAME_DATE'],
                'HOME_TEAM_ID': home_team['id'],
                'HOME_TEAM_ABBREVIATION': home_team['abbreviation'],
                'HOME_TEAM_NAME': home_team['full_name'],
                'HOME_TEAM_LOGO_PATH': team_logos.get(home_team['full_name']),
                'AWAY_TEAM_ID': away_team['id'],
                'AWAY_TEAM_ABBREVIATION': away_team['abbreviation'],
                'AWAY_TEAM_NAME': away_team['full_name'],
                'AWAY_TEAM_LOGO_PATH': team_logos.get(away_team['full_name'])
            }

            upcoming_games.append(game_info)
            seen_game_ids.add(game_identifier)
        return upcoming_games
    except requests.exceptions.RequestException as e:
        print(f'Request error: {e}')
        return []
    except Exception as e:
        print(f'Error fetching game data: {e}')
        return []

if __name__ == '__main__':
    data_type = sys.argv[1]
    if data_type == 'teams':
        loop = asyncio.get_event_loop()
        all_teams = loop.run_until_complete(get_teams())
        print(json.dumps(all_teams))
    elif data_type == 'followed':
        loop = asyncio.get_event_loop()
        team_ids = sys.argv[2:]
        my_teams = loop.run_until_complete(get_team_details(team_ids)) #=[ 1610612737, 1610612738]))
        print(json.dumps(my_teams))
    elif data_type == 'games':
        season = sys.argv[2]
        season_type = sys.argv[3]
        loop = asyncio.get_event_loop()
        upcoming_games = loop.run_until_complete(get_games(season, season_type))
        print(json.dumps(upcoming_games))