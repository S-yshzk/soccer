import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import 'bulma/css/bulma.css';

const DrawChart = (props) => {

    const w = 1400;
    const h = 200;
    const date = [-15, 17, 47, 78, 108, 139, 170, 198, 229, 259, 290, 320];
    const mouth = ["2022/8/1", "2022/9/1", "2022/10/1", "2022/11/1", "2022/12/1", "2023/1/1", "2023/2/1", "2023/3/1", "2023/4/1", "2023/5/1", "2023/6/1", "2023/7/1"];
    const change = (item) => {
        if (props.match !== item) {
            props.changeMatch(item);
            props.changeJudge1(true);
        } else {
            props.changeMatch({});
            props.changeJudge1(false);
        }
    }

    const x = d3.scaleLinear()
        .domain(d3.extent([0, 320]))
        .range([100, w])
        .nice();


    return (
        <div style={{ userSelect: "none" }}>
            <svg width="100%" height={200}>
                <g transform="translate(80,0)" style={{ userSelect: "none" }}>
                    {/* <rect x={x(date[0])} y={1 / 8 * h} width={x(date[11]) - x(date[0])} height={1 / 4 * h} fill="#1e90ff" opacity={0.4}></rect>
            <rect x={x(date[0])} y={5 / 8 * h} width={x(date[11]) - x(date[0])} height={1 / 4 * h} fill="#1e90ff" opacity={0.4}></rect> */}
                    <text textAnchor="middle" dominantBaseline="middle" x={10} y={h / 4}>LaLiga</text>
                    <text textAnchor="middle" dominantBaseline="middle" x={10} y={h / 2}>EL</text>
                    <text textAnchor="middle" dominantBaseline="middle" x={-15} y={(3 / 4) * h}>COPA DELREY</text>
                    <line x1={x(date[0])} y1={1 / 8 * h} x2={x(date[11])} y2={1 / 8 * h} stroke="black"></line>
                    <line x1={x(date[0])} y1={3 / 8 * h} x2={x(date[11])} y2={3 / 8 * h} stroke="black"></line>
                    <line x1={x(date[0])} y1={5 / 8 * h} x2={x(date[11])} y2={5 / 8 * h} stroke="black"></line>
                    <line x1={x(date[0])} y1={7 / 8 * h} x2={x(date[11])} y2={7 / 8 * h} stroke="black"></line>
                    {
                        date.map((item, index) => {
                            return (
                                <g>
                                    <line x1={x(item)} y1={1 / 8 * h} x2={x(item)} y2={7 / 8 * h} stroke="black"></line>
                                    <text textAnchor="middle" dominantBaseline="middle" x={x(item)} y={1 / 16 * h}>{mouth[index]}</text>
                                </g>
                            )
                        })
                    }
                    {props.data.map((item, index) => {
                        let pos;
                        if (item.ligue === 'LaLiga') {
                            pos = h / 4;
                        } else if (item.ligue === 'EL') {
                            pos = h / 2;
                        } else {
                            pos = h * (3 / 4);
                        }
                        let c;

                        let opacity = 1;

                        if (item.members.some(i => String(i) === String(props.player1)) === false && props.player1 !== null) {
                            opacity = 0.15;
                        }

                        if (props.match === index) {
                            c = 'rgb(0, 0, 255)';
                            opacity = 1;
                        } else if (item.stats.result === 'win') {
                            c = 'rgb(0, 255, 0)';
                        } else if (item.stats.result === 'lose') {
                            c = 'rgb(255, 0, 0)';
                        } else {
                            c = 'rgb(128, 128, 128)';
                        }
                        return (
                            <g>
                                <circle onClick={() => change(index)} key={index} cx={x(item.elapsed)} index cy={pos} r={5} fill={c} opacity={opacity} style={{ cursor: "pointer", transition: "opacity 0.5s" }}></circle>
                            </g>
                        )
                    })}
                </g>
            </svg>
        </div>
    )
}

const Member = (props) => {
    const data1 = props.data.slice(0, props.data.length / 2);
    const data2 = props.data.slice(props.data.length / 2, props.data.length);
    return (
        <div className="columns">
            <div className="column">
                <table className="table is-bordered is-narrow is-half">
                    <tbody>
                        {data1.map((item) => {
                            let judge1 = false;
                            let judge2 = false;
                            if (props.player1 === item.id) {
                                judge1 = true;
                            }
                            if (props.player2 === item.id) {
                                judge2 = true;
                            }
                            return (
                                <tr className={judge1 || judge2 ? "is-selected" : ""} onClick={() => props.changePlayer(item.id)} style={{ cursor: "pointer" }}>
                                    <th>{item.pos}</th>
                                    <th>{item.id}</th>
                                    <th>{item.name}</th>
                                </tr>
                            )
                        }
                        )}
                    </tbody>

                </table>
            </div>
            <div className="column">
                <table className="table is-bordered is-narrow is-half">
                    <tbody>
                        {data2.map((item) => {
                            let judge1 = false;
                            let judge2 = false;
                            if (props.player1 === item.id) {
                                judge1 = true;
                            }
                            if (props.player2 === item.id) {
                                judge2 = true;
                            }
                            return (
                                <tr className={judge1 || judge2 ? "is-selected" : ""} onClick={() => props.changePlayer(item.id)} style={{ cursor: "pointer" }}>
                                    <th style={{ userSelect: "none", cursor: "pointer" }}>{item.pos}</th>
                                    <th>{item.id}</th>
                                    <th>{item.name}</th>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        //     if (count === 15) {
        //         pos += 410;
        //         count = 0;
        //     }
        //     count += 1;
        //     let c = 'black'
        //     if (props.player1 === item.id) {
        //         c = 'blue'
        //     }
        //     return (
        //         <g transform="translate(0, 50)">
        //             <line x1={pos} y1={space * count} x2={pos + 410} y2={space * count} stroke="black"></line>
        //             <line x1={pos} y1={space * count} x2={pos} y2={space * (count + 1)} stroke="black"></line>
        //             <text onClick={() => change(item.id)} textAnchor="left" dominantBaseline="middle" x={pos + 5} y={(count + (1 / 2)) * space} stroke={c}>{item.pos + item.id + item.name}</text>
        //             <line x1={pos + 410} y1={space * count} x2={pos + 410} y2={space * (count + 1)} stroke="black"></line>
        //             <line x1={pos} y1={space * (count + 1)} x2={pos + 410} y2={space * (count + 1)} stroke="black"></line>
        //         </g>
        //     )
        // })
    )
}

const DrawMatchStats = (props) => {
    if (props.judge1) {
        return (
            // <svg width={300} height={300}>
            //     <g transform="translate(0, 0)">
            //         <text textAnchor="middle" dominantBaseline="middle" x={40} y={head}>ligue:{props.match.ligue}</text>
            //         <text textAnchor="middle" dominantBaseline="middle" x={40} y={head + space * 1}>節:{props.match.id}</text>
            //         <text textAnchor="middle" dominantBaseline="middle" x={40} y={head + space * 2}>date:{props.match.date}</text>
            //         <text textAnchor="middle" dominantBaseline="middle" x={40} y={head + space * 3}>相手:{props.match.op}</text>
            //         <text textAnchor="middle" dominantBaseline="middle" x={40} y={head + space * 4}>結果：{props.match.stats.result}</text>
            //         <text textAnchor="middle" dominantBaseline="middle" x={40} y={head + space * 5}>スコア：{props.match.stats.score}</text>
            //         <text textAnchor="middle" dominantBaseline="middle" x={40} y={-20} fontFamily="Arial" fontSize={20}>試合情報</text>
            //     </g>
            // </svg>
            <table className="table is-bordered is-narrow is-half">
                <thead>
                    <tr>
                        <th>ligue(節)</th>
                        <th>date</th>
                        <th>相手</th>
                        <th>結果</th>
                        <th>スコア</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{props.match.ligue}({props.match.id})</th>
                        <th>{props.match.date}</th>
                        <th>{props.match.op}</th>
                        <th>{props.match.stats.result}</th>
                        <th>{props.match.stats.score}</th>
                    </tr>
                </tbody>
            </table>
        )
    } else {
        return (
            <table className="table is-bordered is-narrow is-half">
                <thead>
                    <tr>
                        <th>ligue(節)</th>
                        <th>date</th>
                        <th>相手</th>
                        <th>結果</th>
                        <th>スコア</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>選択</th>
                        <th>選択</th>
                        <th>選択</th>
                        <th>選択</th>
                        <th>選択</th>
                    </tr>
                </tbody>
            </table>
        )
    }
}

const DrawPlayerStats = (props) => {
    const w = 200;
    const h = 200;
    let sum1 = 0;
    let winCount1 = 0;
    let drawCount1 = 0;
    let loseCount1 = 0;
    for (const item of props.matchData) {
        if (item.members.some(i => String(i) === String(props.player1))) {
            if (item.stats.result === "win") {
                sum1++;
                winCount1++;
            } else if (item.stats.result === "draw") {
                sum1++;
                drawCount1++;
            } else {
                sum1++;
                loseCount1++;
            }
        }
    }
    const p1 = Math.round(sum1 / 51 * 100);
    const winRate1 = Math.round(winCount1 / sum1 * 100);
    const drawRate1 = Math.round(drawCount1 / sum1 * 100);
    const loseRate1 = Math.round(loseCount1 / sum1 * 100);
    const playerData1 = [{ "name": "勝ち", "value": winRate1 }, { "name": "引き分け", "value": drawRate1 }, { "name": "負け", "value": loseRate1 }];

    let sum2 = 0;
    let winCount2 = 0;
    let drawCount2 = 0;
    let loseCount2 = 0;
    for (const item of props.matchData) {
        if (item.members.some(i => String(i) === String(props.player2)) || props.player2 === null) {
            if (item.stats.result === "win") {
                sum2++;
                winCount2++;
            } else if (item.stats.result === "draw") {
                sum2++;
                drawCount2++;
            } else {
                sum2++;
                loseCount2++;
            }
        }
    }
    const p2 = Math.round(sum2 / 51 * 100);
    const winRate2 = Math.round(winCount2 / sum2 * 100);
    const drawRate2 = Math.round(drawCount2 / sum2 * 100);
    const loseRate2 = Math.round(loseCount2 / sum2 * 100);
    const playerData2 = [{ "name": "勝ち", "value": winRate2 }, { "name": "引き分け", "value": drawRate2 }, { "name": "負け", "value": loseRate2 }];
    const colors = ['#00ff00', '#808080', '#ff0000']
    let t1 = "全試合の結果"
    let t2 = null;
    let text1 = (
        <p>選手を選択</p>
    );
    let text2 = (
        <>
            <p>全試合の結果</p>
            <p>試合数：{sum2}</p>
            <p>勝ち：{winCount2}</p>
            <p>引き分け：{drawCount2}</p>
            <p>負け：{loseCount2}</p>
            <p>出場率：{p2}%</p>
        </>
    )
    if (props.player1 !== null) {
        for (const item of props.membersData) {
            t1 = item.name;
            t2 = "先発時の戦績";
            if (item.id === props.player1) {
                text1 = (
                    <>
                    <h1>選手１</h1>
                        <p>{t1}</p>
                        <p>{t2}</p>
                        <p>試合数：{sum1}</p>
                        <p>勝ち：{winCount1}</p>
                        <p>引き分け：{drawCount1}</p>
                        <p>負け：{loseCount1}</p>
                        <p>出場率：{p1}%</p>
                    </>
                );
            }
            if (item.id === props.player2) {
                text2 = (
                    <>
                    <h2>選手２</h2>
                        <p>{t1}</p>
                        <p>{t2}</p>
                        <p>試合数：{sum2}</p>
                        <p>勝ち：{winCount2}</p>
                        <p>引き分け：{drawCount2}</p>
                        <p>負け：{loseCount2}</p>
                        <p>出場率：{p2}%</p>
                    </>
                );
            }
        }
    }

    if (props.player1 !== null) {
        for (const item of props.membersData) {
            if (item.id === props.player1) {
                t1 = item.name;
                t2 = "先発時の戦績";
            }
        }
    }
    return (
        <div className="columns">
            <div className="column">
                {text1}
                <PieChart width={w} height={h}>
                    <Pie data={playerData1} dataKey="value" nameKey="name" cx={w / 2} cy={h / 2} startAngle={90} endAngle={-270} animationBegin={100} animationDuration={800} outerRadius={50} label >
                        {playerData1.map((entry, index) => {
                            return (
                                <Cell key={`cell-${index}`} fill={colors[index]} />
                            )
                        })}
                        <Tooltip />
                    </Pie>
                </PieChart>
            </div>
            <div className="column">
                {text2}
                <PieChart width={w} height={h}>
                    <Pie data={playerData2} dataKey="value" nameKey="name" cx={w / 2} cy={h / 2} startAngle={90} endAngle={-270} animationBegin={100} animationDuration={800} outerRadius={50} label >
                        {playerData2.map((entry, index) => {
                            return (
                                <Cell key={`cell-${index}`} fill={colors[index]} />
                            )
                        })}
                        <Tooltip />
                    </Pie>
                </PieChart>
            </div>

        </div>
    )
}

function App() {
    const url1 = '/matchesData.json';
    const url2 = '/membersData.json'
    const [matchesData, setMatchesData] = useState([]);
    const [membersData, setMembersData] = useState([]);
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const [match, setMatch] = useState(null);
    const [judge1, setJudge1] = useState(false);
    const changePlayer = (item) => {
        if (player1 === null) {
            setPlayer1(item);
        } else {
            if (item === player1) {
                if (player2 !== null) {
                    setPlayer1(player2);
                    setPlayer2(null);
                } else {
                    setPlayer1(null);
                }
            } else {
                if (item === player2) {
                    setPlayer2(null);
                } else {
                    setPlayer2(item);
                }
            }
        }
    }
    const changeMatch = (item) => {
        setMatch(item);
    }
    const changeJudge1 = (j) => {
        setJudge1(j);
    }
    useEffect(() => {
        fetch(url1).then((response) => response.json())
            .then((jsonData) => {
                setMatchesData(jsonData);
            })
        fetch(url2).then((response) => response.json())
            .then((jsonData) => {
                setMembersData(jsonData);
            })
    }, []);
    return (
        <div>
            <div className="title">
                <h1 className="title is-1">レアルソシエダ戦績</h1>
            </div>
            <div className="columns">
                <Member data={membersData} changePlayer={changePlayer} player1={player1} player2={player2}></Member>
                <div className="column">
                    <DrawPlayerStats matchData={matchesData} player1={player1} membersData={membersData} player2={player2}></DrawPlayerStats>
                    <DrawMatchStats match={matchesData[match]} judge1={judge1} ></DrawMatchStats>
                </div>
                {/* <div className="column">
                <DrawChart data={matchesData} h={h} player1={player1} changeMatch={changeMatch} match={match} changeJudge1={changeJudge1}></DrawChart>
            </div> */}
                {/* <svg width={w} height={h} style={{ position: 'absolute', top: 0, left: 0 }}>
                    <rect x={850} y={10} width={250} height={500} fill="#1e90ff" stroke="black" opacity={0.5}></rect>
                    
                    <DrawMatchStats match={matchesData[match]} judge1={judge1} ></DrawMatchStats>
                    <DrawChart data={matchesData} h={h} player1={player1} changeMatch={changeMatch} match={match} changeJudge1={changeJudge1}></DrawChart>
            </svg>
            <DrawPlayer1Stats matchData={matchesData} player1={player1} membersData={membersData}></DrawPlayer1Stats> */}
            </div>
            <div className="columns">
                <div className="column">
                    <DrawChart data={matchesData} player1={player1} changeMatch={changeMatch} match={match} changeJudge1={changeJudge1}></DrawChart>
                </div>
            </div>
        </div>
    )
}
export default App;
