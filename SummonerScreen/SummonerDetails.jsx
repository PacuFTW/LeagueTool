import React from 'react'
import { ScrollView, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AxiosService from '../AxiosService';
import { justifyContent } from 'react-native-wind/dist/styles/flex/justify-content';

const SummonerDetails = ({navigation}) => {
    const [output, setOutput] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [profile, setProfile] = useState([]);
    const [rank, setRank] = useState([]);
    
    const route = useRoute();

    const imgURL = (champion) =>{ 
        return 'https://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/'+champion+'.png'
    }

    const profileIcon = (id) =>{ 
        return 'https://ddragon.leagueoflegends.com/cdn/12.17.1/img/profileicon/'+id+'.png'
    }

    const rankedIcon = (tier) => {
        let smallLetters = tier.toLowerCase();
        return 'https://opgg-static.akamaized.net/images/medals_new/'+smallLetters+'.png'
    }

    const returnWLP = (W, L) =>{
        let num = (W/(W+L))
        return parseFloat(num*100).toFixed(2);
    }

    const returnQType = (name) =>{
        switch(name){
            case "RANKED_SOLO_5x5": return "Ranked Solo/Duo"
            case "RANKED_FLEX_SR": return "Ranked Flex"
            default: return name
        }
    }

    const masteryIcon = (level) => {
        if (level == 1) return 'https://static.wikia.nocookie.net/leagueoflegends/images/d/d8/Champion_Mastery_Level_1_Flair.png/'
        else if (level == 2) return 'https://static.wikia.nocookie.net/leagueoflegends/images/4/4d/Champion_Mastery_Level_2_Flair.png/'
        else if (level == 3) return 'https://static.wikia.nocookie.net/leagueoflegends/images/e/e5/Champion_Mastery_Level_3_Flair.png/'
        else if (level == 4) return 'https://static.wikia.nocookie.net/leagueoflegends/images/b/b6/Champion_Mastery_Level_4_Flair.png/'
        else if (level == 5) return 'https://static.wikia.nocookie.net/leagueoflegends/images/9/96/Champion_Mastery_Level_5_Flair.png/'
        else if (level == 6) return 'https://static.wikia.nocookie.net/leagueoflegends/images/b/be/Champion_Mastery_Level_6_Flair.png/'
        else return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/7a/Champion_Mastery_Level_7_Flair.png/'
    }

    useEffect(() => {
        AxiosService.getChampions()
        .then(data => {
            var champdict = {};
            Object.keys(data).forEach(function(key){
                let champId = data[key].key;
                champdict[champId] = data[key];
            })
            AxiosService.getSummonerId(route.params.name, route.params.server).then(response => {
                setProfile(response)
                var top3champs = [];
                var mastery = [];
                AxiosService.getSummonerMastery(response.id, route.params.server).then(res =>{
                    for (let i in res){
                        top3champs.push(champdict[res[i].championId])
                        mastery.push(res[i]);
                    }
                    let viewOutput = [];
                    for (let i = 0; i < top3champs.length;i++){
                        let champion = top3champs[i];
                        let masteryTemp = mastery[i];
                        let tempItem = (
                            <View style={{ justifyContent:'center', marginHorizontal: 5, marginTop: 20 }} key={i}>
                                <TouchableOpacity onPress={() => navigation.navigate('ChampionDetails', {name: champion.id})}>
                                    <View style={{ justifyContent:'center'}}>
                                        <Text style={{ color:'white', textAlign:'center', fontSize:15, fontWeight:'bold' }}>{champion.name}</Text>
                                        <Image
                                            style={{width: 60, height: 60, alignSelf:'center'}}
                                            source={{uri: imgURL(champion.id)}}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ justifyContent:'center'}}>
                                    <Image
                                        style={{width: 50, height: 50, alignSelf:'center'}}
                                        source={{uri: masteryIcon(masteryTemp.championLevel)}}
                                    />
                                    <Text style={{ color:'white', textAlign:'center' }}>{masteryTemp.championPoints} Points</Text>
                                </View>
                            </View>
                        );
                        viewOutput.push(tempItem);
                    }
                    AxiosService.getSummonerRank(response.id, route.params.server).then(re =>{
                        let rankTemp = [];
                        for(let i = 0; i < re.length;i++){
                            let ranked = re[i];
                            let tempItem = (
                                <View style={{ justifyContent:'center', marginHorizontal: 10, marginTop: 20 }} key={i}>
                                    <Text style={{ textAlign:'center', color:'white', fontSize:18, fontWeight:'bold' }}>{returnQType(ranked.queueType)}:</Text>
                                    <Image
                                        style={{width: 60, height: 60, alignSelf:'center'}}
                                        source={{uri: rankedIcon(ranked.tier)}}
                                    />
                                    <Text style={{ textAlign:'center', color:'white' }}>{ranked.tier} {ranked.rank}, {ranked.leaguePoints} LP</Text>
                                    <Text style={{ textAlign:'center', color:'white' }}>{ranked.wins}W / {ranked.losses}L</Text>
                                    <Text style={{ textAlign:'center', color:'white' }}>{returnWLP(ranked.wins, ranked.losses)}%</Text>
                                </View>
                            );
                            rankTemp.push(tempItem);
                        }
                        setRank(rankTemp);
                        setOutput(viewOutput);
                        setIsLoading(false);
                    })
                })
            })
        }).catch(err => console.error(err))
  },[])  

  if(isLoading){
    return <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }} size="large" color="#F2EFDE"/>
  }
    
    return (
        <View style={{ flex:1, marginHorizontal: 20, justifyContent:'center', elevation: 8}}>
            <View style={{ backgroundColor:'#0c1923', borderTopLeftRadius:10, borderTopRightRadius:10, paddingTop:10}}>
                <Text style={{ fontSize:30, textAlign: 'center', color:'#fff', fontWeight:'bold' }}>{profile.name}</Text>
                <View style={{ marginTop: 10, flexDirection:'row', justifyContent:'center' }}>
                    <Image
                        style={{width: 75, height: 75, alignSelf:'center', borderRadius:50 }}
                        source={{uri: profileIcon(profile.profileIconId)}}
                    />
                    <Text style={{ fontSize:20, textAlign: 'center', color:'#fff', textAlignVertical:'center', textAlign:'center' }}>  Level: {profile.summonerLevel}</Text>
                </View>
            </View>
            <View style={{justifyContent:'center', flexDirection: 'row', flexWrap: 'wrap', backgroundColor:'#0c1923' }}>
                {rank}
            </View>
            <View style={{justifyContent:'center', flexDirection: 'row', flexWrap: 'wrap', backgroundColor:'#0c1923', borderBottomLeftRadius:10, borderBottomRightRadius:10, paddingBottom:10}} >
                {output}
            </View>
        </View>
    );
}

export default SummonerDetails