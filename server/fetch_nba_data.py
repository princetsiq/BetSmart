import sys
import json
from nba_api.stats.static import teams
from nba_api.stats.endpoints import leaguegamefinder
import requests

def get_teams():
    nba_teams = teams.get_teams()
    detailed_teams = []
    for team in nba_teams:
        team_abbreviation = team['abbreviation']
        detailed_team = {
            'id': team['id'],
            'full_name': team['full_name'],
            'abbreviation': team['abbreviation'],
            'nickname': team['nickname'],
            'city': team['city'],
            'state': team['state'],
            'year_founded': team['year_founded'],
            'logo_path': f'/team_logos/{team_abbreviation.lower()}.png',
            'description': 'team',
            'description': f'''The {team['full_name']} ({team_abbreviation})
                                were founded in {team['year_founded']}. They're located
                                in {team['city']}, {team['state']}. Their nickname is The
                                {team['nickname']}.'''
        }

        detailed_teams.append(detailed_team)
    return detailed_teams

def get_games(season = '2013-14', season_type = 'Regular Season'):
    try:
        gamefinder = leaguegamefinder.LeagueGameFinder(
            season_nullable = season, 
            season_type_nullable = season_type, 
            league_id_nullable = '00'
        )

        games = gamefinder.get_data_frames()[0]
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
                'HOME_TEAM_LOGO_PATH': f'/team_logos/{home_team_abbreviation.lower()}.png',
                'AWAY_TEAM_ID': away_team['id'],
                'AWAY_TEAM_ABBREVIATION': away_team['abbreviation'],
                'AWAY_TEAM_NAME': away_team['full_name'],
                'AWAY_TEAM_LOGO_PATH': f'/team_logos/{away_team_abbreviation.lower()}.png'
            }

            upcoming_games.append(game_info)
            seen_game_ids.add(game_identifier)
        return upcoming_games

    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return []
    except Exception as e:
        print(f"Error fetching game data: {e}")
        return []

if __name__ == "__main__":
    data_type = sys.argv[1]
    if data_type == "teams":
        all_teams = get_teams()
        print(json.dumps(all_teams))
    elif data_type == "games":
        season = sys.argv[2]
        season_type = sys.argv[3]
        upcoming_games = get_games(season, season_type)
        print(json.dumps(upcoming_games))