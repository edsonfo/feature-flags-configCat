import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as configcat from 'configcat-js';
import FlagContext from './context';

function FlagProvider({ children }) {
  const { Provider } = FlagContext;
  const [store, setStore] = useState({});
  useEffect(() => {
    async function getFlags() {
      // const logger = configcat.createConsoleLogger(3);
      const client = configcat.createClient('jSvZCI3q7UWAtdnFrr8GxQ/DLaCb9E7Q0OnmNLKP9FCpA');
      const flagValues = await client.getAllValuesAsync();
      const flagStore = {};
      flagValues.forEach((item) => {
        flagStore[item.settingKey] = item.settingValue;
      });
      setStore(flagStore);
    }
    getFlags();
  }, []);
  return <Provider value={store}>{children}</Provider>;
}

FlagProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default FlagProvider;
