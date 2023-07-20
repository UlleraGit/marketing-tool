import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Header from '../components/Header';
import FooterAdmin from '../components/FooterAdmin'
import useSWR from 'swr';
import { CircularProgress } from '@mui/material';
import Link from 'next/link';

const Dashboard = () => {
  const barsToFill = 7;
  const [count, setCount] = React.useState(0);
  const filledBars = Math.min(count, barsToFill);

  const fetcher = (...args) => fetch(...args, {
    method: "POST",
    body: JSON.stringify({}),
  }).then(res => res.json()).then(res => setCount(res % 7))
  const { data, error, isLoading, isValidating } = useSWR('/api/public/getuser', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  const renderBars = () => {
    const bars = [];
    for (let i = 0; i < barsToFill; i++) {
      const isFilled = i < filledBars;
      const barColor = isFilled ? 'blue' : 'grey';
      bars.push(
        <Box
          key={i}
          width={50}
          height={10}
          bgcolor={barColor}
          marginLeft={1}
          borderRadius={5}
        />
      );
    }
    return bars;
  };

  if (error) {
    return <div>Error occurred while fetching data.</div>;
  }

  if (isLoading || isValidating) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mx: "10%", minHeight: "100vh", }}>
        <CircularProgress />
      </Box>);
  }

  return (
    <>
      <Header />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="30px"
        minHeight="90vh"
      >
        <Typography variant="h4" align="center">
          {barsToFill - filledBars} bars to fill before you get a free survey
        </Typography>
        <Box display="flex" alignItems="center" >
          {renderBars()}
        </Box>
        <Box>
          <Link href="/dcsurvey" passHref>
            <Button variant="contained">
              Umfrage beantworten!
            </Button>
          </Link>
        </Box>
      </Box>
      <FooterAdmin />
    </>
  );
};

export default Dashboard;
