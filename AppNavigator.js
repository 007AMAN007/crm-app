import { createStackNavigator, createAppContainer  } from 'react-navigation';
import Home from './Home';
import Dashboard from './Dashboard';
import Opportunity from './Opportunity';
import Case from './Case';

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Dashboard: { screen: Dashboard},
  Opportunity: { screen: Opportunity},
  Case: { screen: Case},
});

export default createAppContainer(AppNavigator);