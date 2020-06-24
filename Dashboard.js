import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Alert, JSON, FlatList } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import HTML from 'react-native-render-html';


export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tableHead: ['Customer', 'Opportunity', 'Amount', 'Phase'],
      pOTableHead: ['Customer', 'PO#', 'Date', 'Amount', 'Aging', 'Expired Date'],
      caseTableHead: ['Subject', 'Account', 'Description'],
      dashboardTableHead: ['Target', 'YTD', 'MTD']
      //dataSource:[]
    }
  }
  loadOpp(userId) {
    return fetch('http://192.168.1.51/crm/opportunityList.php?userId='+userId)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const tableData = [];
        for (let i = 0; i < responseJson.length; i++) {
          const rowData = [];
          //for (let j = 0; j < 5; j++) {
          rowData.push(responseJson[i].account);
          rowData.push(responseJson[i].name);
          rowData.push(responseJson[i].amount);
          rowData.push(responseJson[i].stage);
          //rowData.push(responseJson[i].stage);
          //}
          tableData.push(rowData);
          //console.log(responseJson[i].id);
        }

        this.setState({
          isLoading: false,
          dataSource: tableData,
        }, function () {

        });

        console.log(this.state.dataSource);



      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadPo() {
    return fetch('http://192.168.1.51/crm/poLits.php')
      .then((response) => response.json())
      .then((responseJson) => {

        const tableData = [];
        for (let i = 0; i < responseJson.length; i++) {
          const rowData = [];
          //for (let j = 0; j < 5; j++) {
          rowData.push(responseJson[i].account_name);
          rowData.push(responseJson[i].title);
          rowData.push(responseJson[i].date);
          rowData.push(responseJson[i].total);
          rowData.push(responseJson[i].status);
          rowData.push(responseJson[i].valid);
          //}
          tableData.push(rowData);
          //console.log(responseJson[i].id);
        }

        this.setState({
          isLoading: false,
          pODataSource: tableData,
        }, function () {

        });

        console.log(this.state.pODataSource);



      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadCase(userId) {
    return fetch('http://192.168.1.51/crm/caseList.php?userId='+userId)
      .then((response) => response.json())
      .then((responseJson) => {

        const tableData = [];
        for (let i = 0; i < responseJson.length; i++) {
          const rowData = [];
          rowData.push(responseJson[i].name);
          rowData.push(responseJson[i].account_name);
          rowData.push(responseJson[i].description);
          tableData.push(rowData);
        }

        this.setState({
          isLoading: false,
          caseDataSource: tableData,
        }, function () {

        });

        console.log(this.state.caseDataSource);



      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadDBData() {
    return fetch('http://192.168.1.51/crm/dashboardList.php')
      .then((response) => response.json())
      .then((responseJson) => {

        const tableData = [];
        const rowData1 = [];
        rowData1.push(' ');
        rowData1.push('Plan');
        rowData1.push('Actual');
        rowData1.push('Plan');
        rowData1.push('Actual');
        tableData.push(rowData1);
        for (let i = 0; i < 1; i++) {
          const rowData2 = [];
          //for (let j = 0; j < 5; j++) {
          rowData2.push('2019');
          rowData2.push(responseJson[0].target_amount);
          rowData2.push(responseJson[0].sum);
          rowData2.push(responseJson[1].target_amount);
          rowData2.push(responseJson[1].sum);
          //rowData2.push('Amount');
          //rowData2.push('Amount');
          //}
          tableData.push(rowData2);
          //console.log(responseJson[i].id);
        }

        this.setState({
          isLoading: false,
          dashboardDataSource: tableData,
        }, function () {

        });

        console.log(this.state.dashboardDataSource);



      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    var userId = this.props.navigation.getParam('name', 'no');
    //Alert.alert(userId);
    this.loadOpp(userId);
    this.loadPo();
    this.loadCase(userId);
    this.loadDBData();

  }

  render() {
    const user = this.props.navigation.getParam('name', 'no');
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <Text style={styles.userText}>User:{user}</Text>
        <View style={{ width: 70, height: 1, marginLeft: 335, marginBottom: 40 }}>

          <Button title="Logout"
            onPress={() => this.props.navigation.navigate('Home')} color="#2196F3" />
        </View>
        <Text style={styles.dashboardText}>Dashboard:</Text>
        <ScrollView style={{ flex: 1 }}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={this.state.dashboardTableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={this.state.dashboardDataSource} textStyle={styles.text} />
          </Table>
        </ScrollView>
        <Text style={styles.boldText}>Opportunity:</Text>
        <ScrollView style={{ flex: 1, marginBottom: 20 }}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={this.state.dataSource} textStyle={styles.text} />
          </Table>
        </ScrollView>
        <Text style={styles.boldText}>PO Outstanding:</Text>
        <ScrollView style={{ flex: 1, marginBottom: 20 }}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={this.state.pOTableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={this.state.pODataSource} textStyle={styles.text} />
          </Table>
        </ScrollView>
        <Text style={styles.boldText}>Cases:</Text>
        <ScrollView style={{ flex: 1, marginBottom: 20 }}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={this.state.caseTableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={this.state.caseDataSource} textStyle={styles.text} />
          </Table>
        </ScrollView>
        <View style={{ width: 60 }}>
          <Button onPress={() => this.props.navigation.navigate('Dashboard')} title="DB.." color="#2196F3" />
        </View>
        <View style={{ width: 60, marginLeft: 65, marginTop: -35 }}>
          <Button onPress={() => this.props.navigation.navigate('Opportunity', { name: user })} title="OPP.." color="#2196F3" />
        </View>
        <View style={{ width: 60, marginLeft: 130, marginTop: -35 }}>
          <Button onPress={() => this.props.navigation.navigate('Case', { name: user })} title="Cases" color="#2196F3" />
        </View>
        <View style={{ width: 60, marginLeft: 195, marginTop: -35 }}>
          <Button title="Tasks" color="#2196F3" />
        </View>
        <View style={{ width: 60, marginLeft: 260, marginTop: -35 }}>
          <Button title="Map" color="#2196F3" />
        </View>
        <View style={{ width: 60, marginLeft: 325, marginTop: -35 }}>
          <Button title="Chat" color="#2196F3" />
        </View>
      </View>
    );


  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  userText: { marginLeft: 320, marginTop: -20 },
  tableOpp: { height: 100 },
  logoutBtn: {
    maxWidth: 10
  },
  boldText: {
    fontWeight: 'bold'
  },
  userText: {

  },
  dashboardText: {
    fontWeight: 'bold'
  }
});