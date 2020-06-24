import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Modal, TouchableHighlight, Alert, TextInput, Picker } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import HTML from 'react-native-render-html';
import DatePicker from 'react-native-datepicker'

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tableHead: ['Customer', 'Opportunity', 'Amount', 'Phase', 'Action'],
      modalVisible: false,
      updateModalVisible: false,
      users: [],
      date: '',
      priority: '',
      status: '',
      accounts: [],
      assigne: '',
      accountSelect: '',
      contactSelect: '',
      contacts: [],
      opportunityValue: '',
      amountValue: '',
      probabilityValue: '',
      remarkValue: '',
      updateOpp: '',
      updateAccount: '',
      updateContact: '',
      updatePriority: '',
      updateAmount: '',
      updateProbability: '',
      updateCloseDate: '',
      updateAssigne: '',
      updateStage: '',
      updateRemark: '',
      updateId: ''
    }
  }


  addOpportunity = () => {
    var userId = this.props.navigation.getParam('name', 'no');
    fetch('http://192.168.1.51/crm/addOpportunity.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        opportunity: this.state.opportunityValue,
        accountName: this.state.accountSelect,
        accountContact: this.state.contactSelect,
        priorityValue: this.state.priority,
        amount: this.state.amountValue,
        probability: this.state.probabilityValue,
        closeDate: this.state.date,
        assigneValue: this.state.assigne,
        statusValue: this.state.status,
        remark: this.state.remarkValue

      })

    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        Alert.alert(responseJson);
        this.setModalVisible(!this.state.modalVisible);
        this.loadOpp(userId);

      }).catch((error) => {

      });

  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  setUpdateModalVisible(visible) {
    this.setState({ updateModalVisible: visible });
  }

  deleteOpp(id) {

    Alert.alert(
      'Alert',
      'Do you want to delete this item?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.deleteOppFinal(id) },
      ],
    );

  }

  updateOpportunity(id) {
    var userId = this.props.navigation.getParam('name', 'no');
    fetch('http://192.168.1.51/crm/updateOpportunity.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        id: id,
        opportunity: this.state.updateOpp,
        accountName: this.state.updateAccount,
        accountContact: this.state.updateContact,
        priorityValue: this.state.updatePriority,
        amount: this.state.updateAmount,
        probability: this.state.updateProbability,
        closeDate: this.state.updateCloseDate,
        assigneValue: this.state.updateAssigne,
        statusValue: this.state.updateStage,
        remark: this.state.updateRemark

      })

    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        Alert.alert(responseJson);
        this.setUpdateModalVisible(!this.state.updateModalVisible);
        this.loadOpp(userId);

      }).catch((error) => {

      });

  }

  editOpp(id) {

    return fetch('http://192.168.1.51/crm/getOpportunity.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        id: id

      })
    }).then((response) => response.json())
      .then((responseJson) => {
        const tableData = [];
        for (let i = 0; i < responseJson.length; i++) {
          const rowData = [];
          console.log(responseJson[i]);
          rowData.push(responseJson[i].account);
          rowData.push(responseJson[i].name);
          rowData.push(responseJson[i].amount);
          rowData.push(responseJson[i].stage);
          rowData.push(responseJson[i].stage);
          this.state.updateOpp = responseJson[i].name;
          this.state.updateAccount = responseJson[i].account_id;
          this.state.updateContact = responseJson[i].account_id;
          this.state.updatePriority = responseJson[i].stage;
          this.state.updateAmount = responseJson[i].amount;
          this.state.updateProbability = responseJson[i].probability;
          this.state.updateCloseDate = responseJson[i].close_date;
          this.state.updateAssigne = responseJson[i].assigned_user_id;
          this.state.updateStage = responseJson[i].stage;
          this.state.updateRemark = responseJson[i].remark;
          this.state.updateId = responseJson[i].id;
        }
        console.log(this.state.updateOpp);
        this.setState({ updateModalVisible: true });
      })
      .catch((error) => {
        console.error(error);
      });

  }

  deleteOppFinal(id) {
    var userId = this.props.navigation.getParam('name', 'no');
    return fetch('http://192.168.1.51/crm/opportunityDelete.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        id: id

      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
        this.loadOpp(userId);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadOpp(userId) {
    return fetch('http://192.168.1.51/crm/opportunityList.php?userId='+userId)
      .then((response) => response.json())
      .then((responseJson) => {

        const tableData = [];
        for (let i = 0; i < responseJson.length; i++) {
          const rowData = [];
          var del = <View >
            <Button title="Delete" onPress={(event) => this.deleteOpp(responseJson[i].id)} color="#2196F3" />
            <Button title="Edit" onPress={(event) => this.editOpp(responseJson[i].id)} color="#2196F3" />
          </View>

          //for (let j = 0; j < 5; j++) {
          rowData.push(responseJson[i].account);
          rowData.push(responseJson[i].name);
          rowData.push(responseJson[i].amount);
          rowData.push(responseJson[i].stage);
          //rowData.push(responseJson[i].stage);
          rowData.push(del);
          //rowData.push(edit);

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

  loadUser() {
    return fetch('http://192.168.1.51/crm/userList.php')
      .then((response) => response.json())
      .then((responseJson) => {

        console.log(responseJson);
        this.setState({
          users: responseJson
        }, function () {

        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadAccount() {
    return fetch('http://192.168.1.51/crm/accountList.php')
      .then((response) => response.json())
      .then((responseJson) => {

        console.log(responseJson);
        this.setState({
          accounts: responseJson
        }, function () {

        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadContact() {
    return fetch('http://192.168.1.51/crm/contactList.php')
      .then((response) => response.json())
      .then((responseJson) => {

        console.log(responseJson);
        this.setState({
          contacts: responseJson
        }, function () {

        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    var userId = this.props.navigation.getParam('name', 'no');
    this.loadOpp(userId);
    this.loadUser();
    this.loadAccount();
    this.loadContact();

  }



  render() {
    const user = this.props.navigation.getParam('name', 'no');
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>


        <View style={{ marginTop: 22 }}>




          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.updateModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{ marginTop: 22 }}>
              <View>
                <TouchableHighlight
                  onPress={() => {
                    this.setUpdateModalVisible(!this.state.updateModalVisible);
                  }}>
                  <Text>Back</Text>
                </TouchableHighlight>
                <Text>Edit Opportunity</Text>

                <Text>Opportunity</Text>
                <TextInput
                  placeholder="Opportunity"
                  onChangeText={updateOpp => this.setState({ updateOpp })}
                  underlineColorAndroid='transparent'
                  style={styles.TextInputStyleClass}
                  value={this.state.updateOpp}
                />


                <Text>Account Name</Text>
                <Picker selectedValue={this.state.updateAccount}
                  onValueChange={(updateAccount, itemIndex) =>
                    this.setState({ updateAccount: updateAccount })
                  }>
                  <Picker.Item label="Select Account" value="" />
                  {this.state.accounts.map(account => (
                    <Picker.Item label={account.name} value={account.id} />
                  ))}
                </Picker>

                <Text>Amount</Text>
                <TextInput
                  placeholder="Amount"
                  onChangeText={updateAmount => this.setState({ updateAmount })}
                  underlineColorAndroid='transparent'
                  style={styles.TextInputStyleClass}
                  value={this.state.updateAmount}
                />
                <Text>Probability(%)</Text>
                <TextInput
                  placeholder="Probability(%)"
                  onChangeText={updateProbability => this.setState({ updateProbability })}
                  underlineColorAndroid='transparent'
                  style={styles.TextInputStyleClass}
                  value={this.state.updateProbability}
                />
                <Text>Close Date</Text>

                <DatePicker
                  style={{ width: 200 }}
                  date={this.state.updateCloseDate}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate="2019-10-01"
                  maxDate="2020-12-31"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(updateCloseDate) => { this.setState({ updateCloseDate: updateCloseDate }) }}
                />

                <Text>Assigne To</Text>
                <Picker
                  selectedValue={this.state.updateAssigne}
                  onValueChange={(updateAssigne, itemIndex) =>
                    this.setState({ updateAssigne: updateAssigne })
                  }
                >
                  <Picker.Item label="Select Assigne" value="" />
                  {this.state.users.map(user => (
                    <Picker.Item label={user.first_name} value={user.id} />
                  ))}
                </Picker>
                
                <Text>Remark</Text>
                <TextInput
                  placeholder="Remark"
                  onChangeText={updateRemark => this.setState({ updateRemark: updateRemark })}
                  underlineColorAndroid='transparent'
                  style={styles.TextInputStyleClass}
                  secureTextEntry={true}
                  numberOfLines={10}
                  multiline={true}
                  value={this.state.updateRemark}
                />

                <Button title="Update" onPress={(event) => this.updateOpportunity(this.state.updateId)} color="#2196F3" />

              </View>
            </View>
          </Modal>













          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{ marginTop: 22 }}>
              <View>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Back</Text>
                </TouchableHighlight>
                <Text>create Opportunity</Text>

                <Text>Opportunity</Text>
                <TextInput
                  placeholder="Opportunity"
                  onChangeText={opportunity => this.setState({ opportunityValue: opportunity })}
                  underlineColorAndroid='transparent'
                  style={styles.TextInputStyleClass}
                />


                <Text>Account Name</Text>
                <Picker selectedValue={this.state.accountSelect}
                  onValueChange={(accountName, itemIndex) =>
                    this.setState({ accountSelect: accountName })
                  }>
                  <Picker.Item label="Select Account" value="" />
                  {this.state.accounts.map(account => (
                    <Picker.Item label={account.name} value={account.id} />
                  ))}
                </Picker>

                <Text>Amount</Text>
                <TextInput
                  placeholder="Amount"
                  onChangeText={amount => this.setState({ amountValue: amount })}
                  underlineColorAndroid='transparent'
                  style={styles.TextInputStyleClass}
                />
                <Text>Probability(%)</Text>
                <TextInput
                  placeholder="Probability(%)"
                  onChangeText={probability => this.setState({ probabilityValue: probability })}
                  underlineColorAndroid='transparent'
                  style={styles.TextInputStyleClass}
                />
                <Text>Close Date</Text>

                <DatePicker
                  style={{ width: 200 }}
                  date={this.state.date}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate="2019-10-01"
                  maxDate="2020-12-31"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => { this.setState({ date: date }) }}
                />

                <Text>Assigne To</Text>
                <Picker
                  selectedValue={this.state.assigne}
                  onValueChange={(assigneValue, itemIndex) =>
                    this.setState({ assigne: assigneValue })
                  }
                >
                  <Picker.Item label="Select Assigne" value="" />
                  {this.state.users.map(user => (
                    <Picker.Item label={user.first_name} value={user.id} />
                  ))}
                </Picker>
                
                <Text>Remark</Text>
                <TextInput
                  placeholder="Remark"
                  onChangeText={remark => this.setState({ remarkValue: remark })}
                  underlineColorAndroid='transparent'
                  style={styles.TextInputStyleClass}
                  secureTextEntry={true}
                  numberOfLines={10}
                  multiline={true}
                />

                <Button title="Add" onPress={this.addOpportunity} color="#2196F3" />

              </View>
            </View>
          </Modal>
        </View>


        <Text>User:{user}</Text>
        <View style={{ width: 70, marginLeft: 0 }}>
          <Button title="New" onPress={() => {
            this.setModalVisible(true);
          }} color="#2196F3" />
        </View>
        <View style={{ width: 70, marginLeft: 335 }}>
          <Button title="Logout" onPress={() => this.props.navigation.navigate('Home')} color="#2196F3" />
        </View>
        <ScrollView style={{ flex: 1, marginBottom: 20 }}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={this.state.dataSource} textStyle={styles.text} />
          </Table>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TextInputStyleClass: {
    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 5,
  }
});