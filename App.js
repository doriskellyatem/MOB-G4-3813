import React, {useState} from'react';
import { View, Text, Pressable, Image } from 'react-native';
 import *as ImagePicker from 'expo-image-picker';

export default function App() {
  const [imageUri, setImageUri] = useState(null);

  const choseFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (result.canceled){
      console.log("Not there");
      return
    }
    const uri = result.assets[0]?.uri;
    if(!uri){
      return
    }
    setImageUri(uri);
  } 
  const takeImage = async() =>{
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if(permission.greanted) {
      console.log("permission denied")
      return
    }
    const result = await ImagePicker.launchCameraAsync();

     if (result.canceled){
      console.log("user cancled");
      return}
      const uri = result.assets[0]?.uri;
      if (!uri) {
        return
      }

      setImageUri(uri);


  } 
  const removeImage=async()=> {

    setImageUri(null);
  }
  return(
    <View>
    <Text> SHOW camera and gallery</Text>
    <Pressable onPress={choseFromGallery}>
    <Text>choseFromGallery</Text>
    </Pressable>
    <Pressable onPress={takeImage}>
    <Text> 
    Take photo
    </Text> 
  
    </Pressable>



    {imageUri && (
      <>
         <Pressable onPress={choseFromGallery}>
         <Text>Replace image</Text> 

    </Pressable>

        <Pressable onPress ={choseFromGallery}>
        <Text>Remove image</Text>
        </Pressable> 
        </>
    )
    
    }
    {imageUri &&(
      <Image
      source={{uri: imageUri}}
      style={{width:300, height:200}}
      />
    )}
     </View>
  )
}