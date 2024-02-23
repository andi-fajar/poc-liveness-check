// import React from 'react';
// import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
// import { Loader, ThemeProvider } from '@aws-amplify/ui-react';

// export function LivenessQuickStartReact() {
//   const [loading, setLoading] = React.useState(false);
//   const [createLivenessApiData, setCreateLivenessApiData] =
//     React.useState(null);

//   React.useEffect(() => {
//     const fetchCreateLiveness = async () => {
//       /*
//        * This should be replaced with a real call to your own backend API
//        */

//       setLoading(true);

//       const response = await fetch('https://1voazfpqk7.execute-api.ap-southeast-1.amazonaws.com/init?refId=testAndi');
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       const responseData = await response.json();

//       setCreateLivenessApiData(responseData);
//       setLoading(false);
//     };

//     fetchCreateLiveness();
//   }, []);

//   const handleAnalysisComplete = async () => {
//     const response = await fetch(
//       `https://1voazfpqk7.execute-api.ap-southeast-1.amazonaws.com/score?sessionId=${createLivenessApiData.sessionId}`
//     );
//     const data = await response.json();

//     console.log(data);
//   };

//   return (
//     <ThemeProvider>
//       {loading ? (
//         <Loader />
//       ) : (
//         <FaceLivenessDetector
//           sessionId={createLivenessApiData.sessionId}
//           region="us-northeast-1"
//           onAnalysisComplete={handleAnalysisComplete}
//           onError={(error) => {
//             console.error(error);
//           }}
//         />
//       )}
//     </ThemeProvider>
//   );
// }