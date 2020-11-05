import React from 'react';
import { AutProvider } from './auth';

const AppProvider: React.FC = ({ children }) => {

    return(
        <AutProvider>
            {children}
        </AutProvider>
    );
}

export default AppProvider;