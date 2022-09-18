import React from 'react'
import { ScrollView, View, Text, Image, ActivityIndicator, TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react';
import AxiosService from '../AxiosService';

export const ChampionHome = ({navigation}) => {
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const imgURL = (champion) =>{ 
    return 'https://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/'+champion+'.png'
  }

  useEffect(() => {
    AxiosService.getChampions()
    .then(data => {
      var champarr = [];
      let axiosOutput = [];
      Object.keys(data).forEach(function(key){
        champarr.push(data[key]);
      }) 
      for(let i = 0; i < champarr.length;i++){
        let champion = JSON.parse(JSON.stringify(champarr[i]));
        var tempItem = (
          <TouchableOpacity style={{  alignItems: 'center',
            justifyContent: 'center',
            elevation: 8,
            width: '20%',
            margin: 6 }} key={i} onPress={() => navigation.navigate('ChampionDetails', {
            name: champion.id
          })}>
            <View style={{ justifyContent: 'center', }}>
              <Image
                style={{ borderRadius: 2, justifyContent: 'center', alignSelf: 'center', width: 75, height: 75}}
                source={{uri: imgURL(champion.id)}}
                />
            </View>
          </TouchableOpacity>
        );
        axiosOutput.push(tempItem);
      }
      setOutput(axiosOutput)
      setIsLoading(false);
    }).catch(err => console.error(err))
  },[])  

  if(isLoading){
    return <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }} size="large" color="#F2EFDE"/>
  }

  return (
    <ScrollView>
      <View style={{ marginTop: 50, justifyContent: 'center', flexDirection: 'row',
        flexWrap: 'wrap' }}>
        { output }
      </View>
    </ScrollView>
  )
}
