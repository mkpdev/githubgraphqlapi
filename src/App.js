import React, { Component } from 'react';
import axios from 'axios';
import './App.css'

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});

const GET_ISSUES_OF_REPOSITORY = `
{
  viewer {
    login
    name
    repositories(first: 10) {
      edges {
        node {
          name
        }
      }
    }
  }
}
`;


const getIssuesOfRepository = () => {
  return axiosGitHubGraphQL.post('', {
    query: GET_ISSUES_OF_REPOSITORY,
  });
};

class App extends Component {
  state = {
  };

  componentDidMount() {
    this.onFetchFromGitHub();
  }

  onFetchFromGitHub = () => {
    getIssuesOfRepository().then(queryResult =>
      this.setState({queryResult:queryResult.data.data})
    );
  };

  render() {
    const { queryResult } = this.state
    return (
      <div className="container ">
        {queryResult && 
          <div className="border my-5 d-inline-block profile_info">
            <div className="row">
              <div className="col-md-4 col-12 ">
                <div className="px-4 py-3 h-100 left_section">
                  <div className="profile-picture mb-3">
                    <img alt = "profile pic"></img>
                  </div>
                  <h5 className="font-weight-bold"> Personal profile : </h5>
                  <p>A software engineer with hands-on experience 
                    in all levels of testing, including performance, 
                    functional, integration, system, and user acceptance.
                  </p>
                  <hr className="border-white"/>
                  <h5 className="font-weight-bold" >Area of expertise</h5>
                  <p>React.js/Redux and Javascript</p>
                  <hr className="border-white"/>
                  <h5 className="font-weight-bold" >Other skills</h5>
                  <p>
                    The ability to analyze complex technical information
                    Can analyze, design and implement database structures Detail oriented
                    Excellent problem solver
                  </p>
                </div>
              </div>
              <div className="col-md-8"> 
                <div className="right-section pb-5 pr-3">
                <h1 className="my-3 text-left text-uppercase">{queryResult.viewer.name}</h1>
                  <h5 className="font-weight-bold" >Get in contact</h5>
                  <p>
                    Home: 123-456-7890
                    Mobile: 123-456-7890
                    123 Anywhere Street, Any City, State, Country 12345
                  </p>
                  <hr className="border-secondary"/>
                  <h5 className="font-weight-bold" >Education history</h5>
                  <p>
                    University of El Dorado
                    Bachelor of Software Engineering, 2014
                    President, Computer and Technology Organization
                    Vice President, Programming Club
                    Member, Video Game Society
                    Member, Student IT Helpdesk 
                    Beechtown Academy
                    Graduated Class of 2010. Honor Roll
                    President and Founder, Computer Club
                    Student Council President
                    Debate Team Vice President
                    Member of the Math Team
                    Member of the Chess Team
                  </p>
                  <hr className="border-secondary"/>
                  <h5 className="font-weight-bold" >Github Details</h5>
                  <p className="mb-1">Username : {queryResult.viewer.login}</p>
                  <p className="mb-1">Email : {queryResult.viewer.name}</p>
                  <p className="mb-1">Projects done :</p>
                  <ul className="d-inline-block"> 
                    {queryResult.viewer.repositories.edges.map((item,index) => {
                      return (
                        <li>
                          {item.node.name} 
                        </li>
                      )
                    })}
                  </ul>
                </div> 
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}


export default App;
