import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Modal, TouchableHighlight, Alert, TextInput, Picker } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import HTML from 'react-native-render-html';
import DatePicker from 'react-native-datepicker'

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Subject', 'Account', 'Description', 'Action'],
            modalVisible: false,
            updateModalVisible: false,
            users: [],
            customer:'',
            subject:'',
            description:'',
            solution:'',
            assigne:'',
            accounts: [],
            updateSubject: '',
            updateAccount: '',
            updateDescription: '',
            updateSolution: '',
            updateAssigne: '',
            updateId: ''
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setUpdateModalVisible(visible) {
        this.setState({ updateModalVisible: visible });
      }

    addCase = () => {
      const userId = this.props.navigation.getParam('name', 'no');
        fetch('http://192.168.1.51/crm/addCase.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
    
            subject: this.state.subject,
            customer: this.state.customer,
            description: this.state.description,
            solution: this.state.solution,
            assigne: this.state.assigne,
    
          })
    
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            Alert.alert(responseJson);
            this.setModalVisible(!this.state.modalVisible);
            this.loadCase(userId);
    
          }).catch((error) => {
    
          });
    
      }

    loadCase(userId) {
      //console.log(userId);
        return fetch('http://192.168.1.51/crm/caseList.php?userId='+userId)
            .then((response) => response.json())
            .then((responseJson) => {

                const tableData = [];
                for (let i = 0; i < responseJson.length; i++) {
                    const rowData = [];

                    var del = <View >
                        <Button title="Delete" onPress={(event) => this.deleteCase(responseJson[i].id)} color="#2196F3" />
                        <Button title="Edit" onPress={(event) => this.editCase(responseJson[i].id)} color="#2196F3" />
                    </View>

                    rowData.push(responseJson[i].name);
                    rowData.push(responseJson[i].account_name);
                    //rowData.push(responseJson[i].date_modified);
                    rowData.push(responseJson[i].description);
                    //rowData.push(responseJson[i].date_modified);
                    rowData.push(del);
                    tableData.push(rowData);
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

      deleteCase(id) {
        Alert.alert(
          'Alert',
          'Do you want to delete this item?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => this.deleteCaseFinal(id) },
          ],
        );
    
      }

      deleteCaseFinal(id) {
        const userId = this.props.navigation.getParam('name', 'no');
        return fetch('http://192.168.1.51/crm/caseDelete.php', {
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
            this.loadCase(userId);
          })
          .catch((error) => {
            console.error(error);
          });
      }

      editCase(id) {

        return fetch('http://192.168.1.51/crm/getCase.php', {
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
              this.state.updateId = responseJson[i].id;
              this.state.updateSubject = responseJson[i].name;
              this.state.updateAccount = responseJson[i].account_id;
              this.state.updateDescription = responseJson[i].description;
              this.state.updateSolution = responseJson[i].resolution;
              this.state.updateAssigne = responseJson[i].assigned_user_id;
              
            }
            //console.log(this.state.updateOpp);
            this.setState({ updateModalVisible: true });
          })
          .catch((error) => {
            console.error(error);
          });
    
      }

      updateCase(id) {
        const userId = this.props.navigation.getParam('name', 'no');
        fetch('http://192.168.1.51/crm/updateCase.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
    
            id: id,
            subject: this.state.updateSubject,
            customer: this.state.updateAccount,
            assigne: this.state.updateAssigne,
            description: this.state.updateDescription,
            solution: this.state.updateSolution
    
          })
    
        }).then((response) => response.json())
          .then((responseJson) => {
            //console.log(responseJson);
            //Alert.alert(responseJson);
            this.loadCase(userId);
            this.setUpdateModalVisible(!this.state.updateModalVisible);
          }).catch((error) => {
    
          });
    
      }

    componentDidMount() {
      const userId = this.props.navigation.getParam('name', 'no');
      //console.log(userId);
      this.loadCase(userId);
      this.loadUser();
      this.loadAccount();
    }

    render() {
        const user = this.props.navigation.getParam('name', 'no');
        return (
            <View style={{ flex: 1, paddingTop: 20 }}>


                <View style={{ marginTop: 22 }}>

                    <View>
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
                                    <Text>create Case</Text>

                                    <Text>Subject</Text>
                                    <TextInput
                                        placeholder="Subject"
                                        onChangeText={subject => this.setState({ subject: subject })}
                                        underlineColorAndroid='transparent'
                                        style={styles.TextInputStyleClass}
                                    />

                                    <Text>Account</Text>
                                    <Picker selectedValue={this.state.customer}
                                        onValueChange={(customer, itemIndex) =>
                                            this.setState({ customer: customer })
                                        }>
                                        <Picker.Item label="Select Account" value="" />
                                        {this.state.accounts.map(account => (
                                            <Picker.Item label={account.name} value={account.id} />
                                        ))}
                                    </Picker>

                                    <Text>Description</Text>
                                    <TextInput
                                        placeholder="Description"
                                        onChangeText={description => this.setState({ description: description })}
                                        underlineColorAndroid='transparent'
                                        style={styles.TextInputStyleClass}
                                        secureTextEntry={true}
                                        numberOfLines={10}
                                        multiline={true}
                                    />

                                    <Text>Solution</Text>
                                    <TextInput
                                        placeholder="Solution"
                                        onChangeText={solution => this.setState({ solution: solution })}
                                        underlineColorAndroid='transparent'
                                        style={styles.TextInputStyleClass}
                                        secureTextEntry={true}
                                        numberOfLines={10}
                                        multiline={true}
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



                                    <Button title="Add" onPress={this.addCase} color="#2196F3" />

                                </View>
                            </View>
                        </Modal>




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
                                    <Text>create Case</Text>

                                    <Text>Subject</Text>
                                    <TextInput
                                        placeholder="Subject"
                                        onChangeText={updateSubject => this.setState({ updateSubject })}
                                        underlineColorAndroid='transparent'
                                        style={styles.TextInputStyleClass}
                                        value={this.state.updateSubject}
                                    />

                                    <Text>Account</Text>
                                    <Picker selectedValue={this.state.updateAccount}
                                        onValueChange={(updateAccount, itemIndex) =>
                                            this.setState({ updateAccount: updateAccount })
                                        }>
                                        <Picker.Item label="Select Account" value="" />
                                        {this.state.accounts.map(account => (
                                            <Picker.Item label={account.name} value={account.id} />
                                        ))}
                                    </Picker>

                                    <Text>Description</Text>
                                    <TextInput
                                        placeholder="Description"
                                        onChangeText={updateDescription => this.setState({ updateDescription })}
                                        underlineColorAndroid='transparent'
                                        style={styles.TextInputStyleClass}
                                        secureTextEntry={true}
                                        numberOfLines={10}
                                        multiline={true}
                                        value={this.state.updateDescription}
                                    />

                                    <Text>Solution</Text>
                                    <TextInput
                                        placeholder="Solution"
                                        onChangeText={updateSolution => this.setState({ updateSolution })}
                                        underlineColorAndroid='transparent'
                                        style={styles.TextInputStyleClass}
                                        secureTextEntry={true}
                                        numberOfLines={10}
                                        multiline={true}
                                        value={this.state.updateSolution}
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



                                    <Button title="Update" onPress={(event) => this.updateCase(this.state.updateId)} color="#2196F3" />

                                </View>
                            </View>
                        </Modal>



                    </View>


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