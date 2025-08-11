import React,{useState} from 'react'
import './Leetcode.css'

function Leetcode() {

  const [username,setUsername] = useState("");
  const [easySolved,setEasySolved] = useState(0);
  const [mediumSolved,setMediumSolved] = useState(0);
  const [hardSolved,setHardSolved] = useState(0);
  const [totaleasy,setTotalEasy] = useState(0);
  const [totalmedium,setTotalMedium] = useState(0);
  const [totalhard,setTotalHard] = useState(0);
  const [loading,setLoading] = useState(false);

  const [totalSolved,setTotalSolved] = useState(0);
  const [acceptanceRate,setAcceptanceRate] = useState(0);
  const [ranking,setRanking] = useState(0);

  const [rating,setRating] = useState(0);
  const [contestRank,setContestRank] = useState(0);
  const [topPercentage,setTopPercentage] = useState(0);

  const updateCircle = (id,solved,total) => {
    const progressDegree = Math.ceil(Number((solved/total)*100));
    const circle = document.getElementById(id);
    circle.style.setProperty("--progress-degree",`${progressDegree}%`);
  }

  const updateData = () => {
    updateCircle(`easy-circle`,easySolved,totaleasy);
    updateCircle(`medium-circle`,mediumSolved,totalmedium);
    updateCircle(`hard-circle`,hardSolved,totalhard);

  }

  const searchUser = async () => {
    setLoading(true);
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
    const data = await res.json();

    const res2 = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`);
    const data2 = await res2.json();
    console.log(data2);
    // const data2 = {
    //   "contestRating": 2032,
    //   "contestGlobalRanking": 15025,
    //   "topPercentage": 2.5
    // };

    console.log(data);
    
    updateData(data)
    setEasySolved(data.easySolved);
    setMediumSolved(data.mediumSolved);
    setHardSolved(data.hardSolved);

    setTotalEasy(data.totalEasy);
    setTotalMedium(data.totalMedium);
    setTotalHard(data.totalHard);

    setTotalSolved(data.easySolved + data.mediumSolved + data.hardSolved);
    setAcceptanceRate(data.acceptanceRate);
    setRanking(data.ranking);

    setRating(Math.ceil(data2.contestRating))
    setContestRank(data2.contestGlobalRanking)
    setTopPercentage(data2.contestTopPercentage);
    setLoading(false);
  }


  return (
    <div className='w-full h-[calc(100vh-75px)] flex flex-wrap items-center justify-center bg-gray-700'>
      <div className='w-180 h-140 bg-gray-900 rounded-2xl  '>
      
        <h1 className='px-8 pt-4 text-blue-700 text-3xl font-bold'>Leetcode Progress</h1>
          {/* <div className='p-6 text-white' class="user-cont"> */}
          <div className='p-8 text-white user-cont'>
              <p>Enter Username : </p>
                <div className="my-4 user-input-cont">
                  <input className='bg-gray-700 rounded-2xl px-8 border-blue-700 border-4'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} 
                  type="text" 
                  name="username" 
                  id="user-input" 
                  placeholder="Enter username..." />
                  <button className='mx-6 px-4 bg-blue-700 rounded-2xl border-blue-700 border-4' 
                  onClick={searchUser}
                  id="search-btn">{loading?"Searching" : "Search"}</button>
                </div>
          </div>
          <div className='px-6 py-0 text-white'>
            <div className='user-stats'>
              <div className='flex flex-wrap justify-evenly'>
                <div id='easy-circle' className='easy-chart h-35 w-35 m-2 bg-gray-700 rounded-full flex items-center justify-center flex-col border-blue-700 border-4'>
                  <div>Easy</div>
                  <div>{easySolved}/{totaleasy}</div>
                </div>
                <div id='medium-circle' className='medium-chart h-35 w-35 m-2 bg-gray-700 rounded-full flex items-center justify-center flex-col border-blue-700 border-4'>
                  <div>Medium</div>
                  <div>{mediumSolved}/{totalmedium}</div>
                </div>
                <div id='hard-circle' className='hard-chart h-35 w-35 m-2 bg-gray-700 rounded-full flex items-center justify-center flex-col border-blue-700 border-4'>
                  <div>Hard</div>
                  <div>{hardSolved}/{totalhard}</div>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap justify-evenly'>
              <div className='w-50 h-20 bg-gray-700 m-2 rounded-xl px-4 py-2 border-blue-700 border-4'>Total Solved : 
                <div className='text-blue-700 text-2xl font-bold'>{totalSolved}</div>
              </div>
              <div className='w-50 h-20 bg-gray-700 m-2 rounded-xl px-4 py-2 border-blue-700 border-4'>Ranking :
                <div className='text-blue-700 text-2xl font-bold'>{ranking}</div>
              </div>
              <div className='w-50 h-20 bg-gray-700 m-2 rounded-xl px-4 py-2 border-blue-700 border-4'>Acceptance :
                <div className='text-blue-700 text-2xl font-bold'>{acceptanceRate} %</div>
              </div>
            </div>
            <div className='flex flex-wrap justify-evenly'>
              <div className='w-50 h-20 bg-gray-700 m-2 rounded-xl px-4 py-2 border-blue-700 border-4'>Rating :
                <div className='text-blue-700 text-2xl font-bold'>{rating}</div>
              </div>
              <div className='w-50 h-20 bg-gray-700 m-2 rounded-xl px-4 py-2 border-blue-700 border-4'>Contest Rank :
                <div className='text-blue-700 text-2xl font-bold'>{contestRank}</div>
              </div>
              <div className='w-50 h-20 bg-gray-700 m-2 rounded-xl px-4 py-2 border-blue-700 border-4'>Top :
                <div className='text-blue-700 text-2xl font-bold'>{topPercentage} %</div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )++
}

export default Leetcode


// https://alfa-leetcode-api.onrender.com/harshit_404/contest
// https://github.com/alfaarghya/alfa-leetcode-api?tab=readme-ov-file