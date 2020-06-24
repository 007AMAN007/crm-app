import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default class Dashboard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style= {styles.title}>Login</Text>
        <Button
          title="Back to home"
          onPress={() =>
            this.props.navigation.navigate('Home')
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
















import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Alert } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9'],
      widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200]
    }
  }

  componentDidMount(){
    const tableData = [];
    return fetch('http://192.168.43.140/crm/opportunityList.php')
    .then((response) => response.json())
    .then((responseJson) => {
      for (let i = 0; i < 3; i += 1) {
        const rowData = [];
        for (let j = 0; j < 9; j += 1) {
          rowData.push(`${i}${j}`);

        }
        Alert.alert(rowData[i]);
        tableData.push(rowData);
      }
    })
  .catch((error) => {
    console.error(error);
  });
 
  }

  render() {
    const state = this.state;
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }
 
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  userText: {marginLeft:320, marginTop:-20},
  tableOpp:{ height: 100 }
});



















import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Alert } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9'],
      widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200]
    }
  }

  componentDidMount(){
    const tableData = [];
    return fetch('http://192.168.1.51/crm/opportunityList.php')
    .then((response) => response.json())
    .then((responseJson) => {
      for (let i = 0; i < 3; i += 1) {
        const rowData = [];
        for (let j = 0; j < 9; j += 1) {
          rowData.push(`${i}${j}`);

        }
        Alert.alert(rowData[i]);
        tableData.push(rowData);
      }
    })
  .catch((error) => {
    console.error(error);
  });
 
  }

  render() {
    const state = this.state;
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }
 
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  userText: {marginLeft:320, marginTop:-20},
  tableOpp:{ height: 100 }
});























<?php
include 'DBConfig.php';
 
// Create connection
$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
 
if ($conn->connect_error) {
 
 die("Connection failed: " . $conn->connect_error);
} 
 
$sql = "SELECT * FROM opportunities";
 
$result = $conn->query($sql);
 
if ($result->num_rows >0) {
 
 
 while($row[] = $result->fetch_assoc()) {
 
 $tem = $row;
 
 $json = json_encode($tem);
 
 
 }
 
} else {
 echo "No Results Found.";
}
 echo $json;
$conn->close();
?>



<h1>This HTML snippet is now rendered with native components !</h1>
<h2>Enjoy a webview-free and blazing fast application</h2>
<img src="https://i.imgur.com/dHLmxfO.jpg?2" />
<em style="textAlign: center;">Look at how happy this native cat is</em>


 {/* <HTML html={htmlContent} /> */}



 <View style={{flex: 1, paddingTop:20}}>
        <ScrollView style={{ flex: 1 }}>
        <FlatList
          data={this.state.tableHead}
          renderItem={({item}) => <Text>{'Customer'}        {'Opportunity'}        {'Amount'}        {'Phase'}        {'Confirm'}</Text>}
          keyExtractor={({id}, index) => id}
        />  
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{'item.id'}        {item.name}        {item.amount}        {item.stage}        {item.stage}</Text>}
          keyExtractor={({id}, index) => id}
        />
        </ScrollView>
      </View>