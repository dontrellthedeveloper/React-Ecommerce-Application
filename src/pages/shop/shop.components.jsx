import React from 'react';
import {Route} from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

class ShopPage extends React.Component {
   unsubscribeFRomSnapshot = null;

   componentDidMount() {
      const collectionRef = firestore.collection('collections');

      collectionRef.onSnapshot(async snapshot => {
         convertCollectionsSnapshotToMap(snapshot);
      })
   }

      render() {
            const {match} = this.props;
            return (

               <div className='shop-page'>
                  <Route exact path={`${match.path}`} component={CollectionsOverview} />
                  <Route exact path={`${match.path}/:collectionId`} component={CollectionPage}/>
               </div>
      ); 
   }
}

export default ShopPage;