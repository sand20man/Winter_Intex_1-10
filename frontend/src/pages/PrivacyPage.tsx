import { useEffect, useState } from 'react';
import { fetchCurrentUser } from '../api/MovieAPI';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import PrivacyPolicy from '../components/PrivacyPolicy';

function PrivacyPage() {
  const [homePageBool, setHomePageBool] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Get user info from backend
        console.log('Attempting to fetch current user');
        const user = await fetchCurrentUser();

        if (user.userId !== 0) setHomePageBool(false);
        else setHomePageBool(true);
      } catch (error) {
        console.error('Failed to load recommendations', error);
        setHomePageBool(true);
      }
    };

    loadUser();
  }, []);

  return (
    <>
      <Navbar
        onSearchChange={() => {}}
        homePageBool={homePageBool}
        showSearch={false}
        setShowSearch={() => {}}
        searchInput=""
        setSearchInput={() => {}}
      />
      <PrivacyPolicy />
      <Footer />
    </>
  );
}

export default PrivacyPage;
