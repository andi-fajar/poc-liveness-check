import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Input, Loader, Button, Form, FormInput, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import { useState } from 'react';
import { ThemeProvider } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import awsexports from './aws-exports';
import { FaceLivenessDetector, AwsCredentialProvider, AwsTemporaryCredentials } from '@aws-amplify/ui-react-liveness';
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers"; 
import { isEmpty, get } from 'lodash';

Amplify.configure(awsexports);
const currentConfig = Amplify.getConfig();
console.log(currentConfig);

const ScoreSection = (score) => {
  return !isEmpty(score.score) ? <div>
      <p>{`Confident : ${score.score.confidence}`}</p>
      <p>{`Status : ${score.score.status}`}</p>
      <p>Referece Image</p>
      <img src={
        `data:image/png;base64, ${score.score.referenceImageBase64}`
      } alt="Red dot" />
  </div> : <p>No score yet</p>
}


function Home() {

  const [scoreIsLoading, setScoreIsLoading] = useState(false);
  const [score, setScore] = useState({});
  const [sessionIsLoading, setSessionIsLoading] = useState(false);
  const [refId, setRefId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [credentials, setCredentials] = useState({});
  const handleChange = (e, { value }) => {
    setRefId(value);
  }
  const handleAnalysisComplete = () => {
    fetchScore();
  }

  const fetchCredential = async () => {
    console.log(credentials);
  
    const createAwsCredentialProvider = async (identityProperties) => {
      const accessKeyId = credentials.accessKeyId;
      const secretAccessKey = credentials.secretAccessKey;
      const sessionToken = credentials.sessionToken;
      const expiration = new Date(credentials.expiration)
  
      return {
          accessKeyId,
          secretAccessKey,
          sessionToken,
          expiration
      };
  };


  console.log("UPDATE");
  console.log(createAwsCredentialProvider());

    return createAwsCredentialProvider();
  };

  const fetchScore = async () => {
    setScoreIsLoading(true);
    const response = await fetch(
      `https://yycwfsoxsb.execute-api.ap-northeast-1.amazonaws.com/score?sessionId=${sessionId}`
    );
    const data = await response.json();
    setScoreIsLoading(false);
    setScore(data);
    console.log(data);
  }

  const fetchCreds = () => {
    const creds = fetchCredential();
    console.log(creds);
  }

  const fetchCreateLiveness = async () => {
    setSessionIsLoading(true);

    // const response = await fetch(`https://mfcpapi.mfc.staging-traveloka.com/mfcverf/v1/liveness/poc/initialize`, 
    //   {  method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(
    //       {
    //         "clientInterface": "mobile-android",
    //         "context": {
    //             "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbHMiOlsiYW5ka3ljN0B5b3BtYWlsLmNvbSJdLCJzdWIiOiIyMTg3ODA0NyIsInBob25lX251bWJlcnMiOltdLCJ1c2VyX2lkIjoiYW5ka3ljN0B5b3BtYWlsLmNvbS10diIsInNlY3VyZV9hY2Nlc3MiOmZhbHNlLCJpc3MiOiJ0cmF2ZWxva2EuY29tIiwibmFtZSI6IkEgU2V2ZW4iLCJlbWFpbF9wcmltYXJ5IjoiYW5ka3ljN0B5b3BtYWlsLmNvbSIsInNlY3VyZV9hY2Nlc3NfZXhwIjoxNzA3NzMyMjY1LCJleHAiOjE3MDc3MzMxNjUsImlhdCI6MTcwNzczMjI2NX0.OFnSbS8j2TOcmGla8mG9BrGp6jai2MtTdrdvQJn3_6A",
    //             "lifetimeId": "1790685826505517870",
    //             "nonce": "8763d576-6a48-4d40-a40c-353d2798a23b",
    //             "sessionId": "e29d8ce3-d2b7-4be9-a310-a16b0c286b0f"
    //         },
    //         "data": {
    //             "clientId": "TVLK_PL",
    //             "email": "email",
    //             "extRefId": refId
    //         },
    //         "fields": []
    //     }
    //   )
    // }
    // );
    const response = await fetch(`https://yycwfsoxsb.execute-api.ap-northeast-1.amazonaws.com/init?refId=${refId}`)
    if (!response.ok) {
      console.log("Error");
      console.log(response);
      return
    }
    const responseData = await response.json();

    // setSessionId(responseData.data.response.sessionId);
    setSessionId(responseData.sessionId);
    setCredentials(responseData.credentials);
    setSessionIsLoading(false);

    // console.log(credentialProvider());
  };

  return (
    <ThemeProvider>
    <div className="App">
      <body>
          <Grid>
            <GridRow>
              <GridColumn width={3}>
                
              </GridColumn>
              <GridColumn width={5}>
                
              </GridColumn>
              <GridColumn width={5}>
               
              </GridColumn>
              <GridColumn width={3}>
              <Button
                  color="blue"
                  loading={sessionIsLoading}
                  onClick={() => {
                    fetchCreds();
                  }}
                >
                 Test creds
                </Button>
              </GridColumn>
            </GridRow>
            <GridRow>
            <GridColumn width={4}>
              <Input inline
                  label='Reference Id: '
                    control='input'
                    placeholder='Some random string'
                    value={refId}
                    onChange={handleChange}
                  />
            </GridColumn>
            <GridColumn width={4}>
              <Button
                  color="blue"
                  loading={sessionIsLoading}
                  onClick={() => {
                    fetchCreateLiveness();
                  }}
                >
                  Start Liveness
                </Button>
            </GridColumn>
          
            <GridColumn width={4}>
                <Input loading={sessionIsLoading} inline value={sessionId ? sessionId : "-"} label="SessionId : " disabled></Input>
            </GridColumn>
            <GridColumn width={4} />
          </GridRow>
          <GridRow>
            <GridColumn width={16}>
                {
                  sessionId ? <FaceLivenessDetector
                    sessionId={sessionId}
                    region="ap-northeast-1"
                    config={{ credentialProvider: fetchCredential }}
                    onAnalysisComplete={handleAnalysisComplete}
                    onError={(error) => {
                      console.error(error);
                    }}
                /> :  <p>Liveness check not started yet</p>
                }
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn width={3}>
                <Button 
                color="red"
                loading={scoreIsLoading}
                onClick={() => {
                  fetchScore();
                }}>
                  Get Score
                </Button>
            </GridColumn>
            <GridColumn width={13}>
              {
                scoreIsLoading ? <Loader active inline='centered' /> : 
                <ScoreSection score={score}></ScoreSection>
              }
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn width={16}>
              Audit Images : 
            </GridColumn>
          </GridRow>
          <GridRow>
                  <GridColumn width={4}>
                    <img src={
                      `data:image/png;base64, ${get(score, 'auditImageBase64.0')}`
                    } />
                </GridColumn>
                <GridColumn width={4}>
                    <img src={
                      `data:image/png;base64, ${get(score, 'auditImageBase64.1')}`
                    } />
                </GridColumn>
                <GridColumn width={4}>
                    <img src={
                      `data:image/png;base64, ${get(score, 'auditImageBase64.2')}`
                    } />
                </GridColumn>
                <GridColumn width={4}>
                    <img src={
                      `data:image/png;base64, ${get(score, 'auditImageBase64.3')}`
                    }  />
                </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn width={16}>
{get(score, 'auditImageBase64.1', []).length}
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn width={16}>
{get(score, 'auditImageBase64', []).forEach((item) => <p>{item}</p>)}
            </GridColumn>
          </GridRow>
          </Grid>
      </body>
    </div>
    </ThemeProvider>
  );
}

export default Home;
