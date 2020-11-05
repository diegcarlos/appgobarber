import React from 'react';
import Button from '../../components/button'

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

 const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

   return(
    <Container>
        <Button onPress={signOut}> Sair </Button>
    </Container>
   );
 };
export default Dashboard;