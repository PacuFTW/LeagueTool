import axios from 'axios'

const apiKey= "RGAPI-60c42d36-9f0c-4b54-bdf6-f517669043e5";

class AxiosService {
  constructor() {
  }

  async getChampions(){
    const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/12.17.1/data/en_US/champion.json')
    return response.data.data;
  }

  async getChampionDetail(name){
    const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/12.17.1/data/en_US/champion/'+name+'.json')
    return response.data.data;
  }

  async getSummonerMastery(id, server){
    const response = await axios.get('https://'+server+'.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/'+id+'/top?count=3&api_key='+ apiKey)
    return response.data;
  }

  async getSummonerId(name, server){
    const response = await axios.get('https://'+server+'.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+name+'?api_key='+apiKey)
    return response.data
  }

  async getSummonerChallenges(puuid, server){
    const response = await axios.get('https://'+server+'.api.riotgames.com/lol/challenges/v1/player-data/'+puuid+'?api_key='+apiKey)
    return response.data.challenges;
  }

  async getSummonerRank(summonerId, server){
    const response = await axios.get('https://'+server+'.api.riotgames.com/lol/league/v4/entries/by-summoner/'+summonerId+'?api_key='+apiKey)
    return response.data;
  }
  
  async getChallengeDescriptions(id, server){
    //console.log(id);
    const response = await axios.get('https://'+server+'.api.riotgames.com/lol/challenges/v1/challenges/'+id+'/config?api_key='+apiKey)
    return response.data
  }
}

export default (new AxiosService());
