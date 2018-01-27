import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, Button, ListView, TextInput } from 'react-native';
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    items: state.items,
  })

let rows = []
const now = Date.now();

const itemKeyExtractor = ({key}) => key

const groupArrayBy = (arr, key) =>{
  let reduced = arr.reduce((r, current)=>{
    (r[current[key]] = r[current[key]] || []).push(current)
    return r
  }, {})

  let r = []
  const keys = Object.keys(reduced).sort().reverse();
  for(let i=0;i<keys.length;i++)
    r = r.concat(reduced[keys[i]])
   return r
}

const sortByDateDesc = (a, b) =>{
  if(a.lastModified == b.lastModified) {
    return a.text.localeCompare(b.text);
  }

  return b.lastModified-a.lastModified;
}

class SimpleList extends React.Component {
    constructor(props){
      super(props)
      this.state = {items: groupArrayBy(rows.sort(sortByDateDesc), "isActive"), newItem:''}
    }
  
    removeItem = (index) => {
      const { dispatch } = this.props
      this.state.items[index].isActive = false
      this.state.items[index].lastModified = Date.now()
      this.state.items.sort(sortByDateDesc);
      this.setState({items: groupArrayBy(this.state.items, "isActive"), newItem:this.state.newItem})
      this.forceUpdate()
      dispatch({type:"REMOVE"})
    }
  
    renderItem = ({item, index})=>{
      return (
        <TouchableHighlight onLongPress={()=>{this.removeItem(index)}}>
          <View style={[styles.row, !item.isActive && styles.inactiveRow]}>
            <Text>{item.text}</Text>
          </View>
        </TouchableHighlight>
      )
    }
  
    addItem = ()=> {
        const {dispatch} = this.props
        console.log(this.props)
      if(this.state.newItem){
        this.state.items.push({key: Date.now(), text: this.state.newItem, lastModified: Date.now(), isActive: true})  
        this.setState({items: groupArrayBy(this.state.items.sort(sortByDateDesc), "isActive"), newItem: ''})
        this.forceUpdate()
      }

      dispatch({type:"ADD"})
    }
  
    changeText = (text) => {
      this.setState({items: this.state.items, newItem: text})
    }
  
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>a simple list</Text>  
          <View style={{height: 60, flexDirection: 'row', padding: 10}}>
            <TextInput 
              value={this.state.newItem} placeholder='type to add a new item' 
              onSubmitEditing={this.addItem} onChangeText={this.changeText} 
              style={{flex: 1}} underlineColorAndroid='transparent'/>
            <Button title="Add" onPress={this.addItem}
              color='purple' 
              style={{flex: 1}}/>
          </View>
          <FlatList
              data={this.state.items}
              renderItem={this.renderItem}
              keyExtractor={itemKeyExtractor}
              extraData={this.state}/>
        </View>
      );
    }
  }

  export default connect(mapStateToProps)(SimpleList)
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 25
    },
    title: {
      fontSize: 20,
      backgroundColor: '#ef7de7',
      padding: 15,
      marginBottom: 5,
      alignItems: 'center'
    },
    row: {
      padding: 15,
      marginBottom: 5,
      backgroundColor: '#76B59B'
    }, 
    inactiveRow: {
      backgroundColor: 'gray'
    }
  });  