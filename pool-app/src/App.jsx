import { useState } from "react";

const DAYS = ["월","화","수","목","금","토","일"];
const TIMES = ["06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];

const ACCENT = "#4FC3F7";
const ACCENT2 = "#00E5FF";
const GREEN = "#69F0AE";
const CORAL = "#FF6E6E";
const GOLD = "#FFD54F";
const PURPLE = "#CE93D8";

const initialClasses = [
  { id:1, name:"아침 수영", instructor:"김지수", day:"월", time:"06:00", duration:60, lane:"1레인", capacity:10, enrolled:8, color:ACCENT },
  { id:2, name:"자유수영", instructor:"박민준", day:"월", time:"09:00", duration:90, lane:"전체", capacity:30, enrolled:22, color:GREEN },
  { id:3, name:"어린이반", instructor:"이수아", day:"화", time:"10:00", duration:60, lane:"2레인", capacity:8, enrolled:8, color:CORAL },
  { id:4, name:"성인 중급", instructor:"김지수", day:"수", time:"19:00", duration:60, lane:"3레인", capacity:12, enrolled:10, color:GOLD },
  { id:5, name:"새벽 수영", instructor:"박민준", day:"목", time:"06:00", duration:60, lane:"1레인", capacity:10, enrolled:6, color:ACCENT2 },
  { id:6, name:"수중 에어로빅", instructor:"최하늘", day:"금", time:"11:00", duration:60, lane:"4레인", capacity:15, enrolled:12, color:PURPLE },
];

const initialStaff = [
  { id:1, name:"김지수", role:"수영 강사", phone:"010-1234-5678", status:"근무중", workDays:["월","수","금"], startTime:"06:00", endTime:"15:00", avatar:"🏊" },
  { id:2, name:"박민준", role:"수영 강사", phone:"010-2345-6789", status:"휴무", workDays:["월","화","목","토"], startTime:"09:00", endTime:"18:00", avatar:"🏋️" },
  { id:3, name:"이수아", role:"어린이 강사", phone:"010-3456-7890", status:"근무중", workDays:["화","목","토"], startTime:"10:00", endTime:"17:00", avatar:"👶" },
  { id:4, name:"최하늘", role:"에어로빅 강사", phone:"010-4567-8901", status:"근무중", workDays:["월","수","금","일"], startTime:"10:00", endTime:"19:00", avatar:"💃" },
  { id:5, name:"정우성", role:"안전요원", phone:"010-5678-9012", status:"근무중", workDays:["월","화","수","목","금"], startTime:"06:00", endTime:"21:00", avatar:"🛟" },
  { id:6, name:"한소희", role:"프런트", phone:"010-6789-0123", status:"휴무", workDays:["화","수","토","일"], startTime:"09:00", endTime:"18:00", avatar:"💼" },
];

const initialPickups = [
  { id:1, member:"김태양 (7세)", guardian:"김부모", phone:"010-1111-2222", pickupTime:"11:00", driver:"이수아", address:"행복아파트 101동", day:"화", status:"대기" },
  { id:2, member:"박소율 (8세)", guardian:"박부모", phone:"010-2222-3333", pickupTime:"11:30", driver:"이수아", address:"하늘마을 205호", day:"화", status:"완료" },
  { id:3, member:"최민서 (6세)", guardian:"최부모", phone:"010-3333-4444", pickupTime:"11:00", driver:"박민준", address:"별빛아파트 303동", day:"목", status:"대기" },
  { id:4, member:"이하준 (9세)", guardian:"이부모", phone:"010-4444-5555", pickupTime:"12:00", driver:"이수아", address:"초록마을 102동", day:"토", status:"대기" },
];

const initialMembers = [
  { id:1, name:"홍길동", age:35, phone:"010-9999-1111", plan:"월정기", instructor:"김지수", since:"2024-01", status:"활성" },
  { id:2, name:"김영희", age:42, phone:"010-9999-2222", plan:"3개월", instructor:"최하늘", since:"2023-11", status:"활성" },
  { id:3, name:"이철수", age:28, phone:"010-9999-3333", plan:"월정기", instructor:"박민준", since:"2024-03", status:"활성" },
  { id:4, name:"박지민", age:31, phone:"010-9999-4444", plan:"자유수영", instructor:"-", since:"2024-02", status:"만료" },
  { id:5, name:"김태양", age:7, phone:"010-1111-2222", plan:"어린이반", instructor:"이수아", since:"2024-01", status:"활성" },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Syne:wght@700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:#0A0E1A;font-family:'Noto Sans KR',sans-serif;color:#F0F4FF;}
.app{min-height:100vh;background:#0A0E1A;position:relative;overflow-x:hidden;}
.blob{position:fixed;border-radius:50%;filter:blur(90px);opacity:0.15;pointer-events:none;z-index:0;}
.b1{width:320px;height:320px;background:#4FC3F7;top:-100px;left:-100px;}
.b2{width:220px;height:220px;background:#CE93D8;bottom:80px;right:-70px;}
.b3{width:160px;height:160px;background:#69F0AE;top:45%;left:25%;}
.wrap{position:relative;z-index:1;max-width:480px;margin:0 auto;padding-bottom:110px;}

/* Header */
.hdr{padding:54px 20px 22px;}
.hdr-eye{font-family:'Syne',sans-serif;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#4FC3F7;margin-bottom:8px;}
.hdr-title{font-family:'Syne',sans-serif;font-size:30px;font-weight:800;line-height:1.15;}
.hdr-title em{font-style:normal;color:#4FC3F7;}
.hdr-date{font-size:12px;color:#6B7280;margin-top:7px;letter-spacing:.5px;}

/* Stats */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:0 16px 26px;}
.stat{background:#111827;border:1px solid rgba(255,255,255,.07);border-radius:18px;padding:16px 8px;text-align:center;position:relative;overflow:hidden;}
.stat::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--c,#4FC3F7),transparent);opacity:.7;}
.stat-n{font-family:'Syne',sans-serif;font-size:23px;font-weight:800;color:var(--c,#4FC3F7);}
.stat-l{font-size:10px;color:#6B7280;margin-top:2px;}

/* Nav */
.nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:480px;z-index:50;background:rgba(10,14,26,.9);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.07);display:flex;padding:10px 12px 22px;gap:4px;}
.nb{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;border:none;background:none;color:#6B7280;font-family:'Noto Sans KR';font-size:10px;font-weight:500;padding:8px 4px;border-radius:12px;cursor:pointer;transition:all .2s;}
.nb.on{color:#4FC3F7;}
.nb.on .niw{background:rgba(79,195,247,.14);border-color:rgba(79,195,247,.28);}
.niw{width:38px;height:38px;border-radius:11px;border:1px solid transparent;display:flex;align-items:center;justify-content:center;font-size:18px;transition:all .2s;}

/* Section */
.sec{padding:0 16px;}
.sec-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
.sec-title{font-family:'Syne',sans-serif;font-size:17px;font-weight:800;}
.addbtn{display:flex;align-items:center;gap:5px;background:rgba(79,195,247,.1);border:1px solid rgba(79,195,247,.28);color:#4FC3F7;border-radius:10px;padding:7px 13px;font-size:12px;font-family:'Noto Sans KR';font-weight:700;cursor:pointer;transition:all .2s;}
.addbtn:hover{background:rgba(79,195,247,.18);}

/* Day tabs */
.dtabs{display:flex;gap:7px;overflow-x:auto;padding-bottom:12px;margin-bottom:14px;scrollbar-width:none;}
.dtabs::-webkit-scrollbar{display:none;}
.dtab{flex-shrink:0;width:42px;height:42px;border-radius:13px;border:1px solid rgba(255,255,255,.07);background:#111827;color:#6B7280;font-size:13px;font-weight:700;cursor:pointer;font-family:'Noto Sans KR';transition:all .2s;}
.dtab.on{background:#4FC3F7;color:#0A0E1A;border-color:#4FC3F7;box-shadow:0 0 20px rgba(79,195,247,.38);}

/* Class card */
.clscard{background:#111827;border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:18px 16px;margin-bottom:12px;display:flex;gap:14px;align-items:flex-start;position:relative;overflow:hidden;transition:border-color .2s;}
.clscard:hover{border-color:rgba(79,195,247,.2);}
.clsglow{position:absolute;top:0;left:0;right:0;height:1px;opacity:.7;}
.clsbar{width:3px;border-radius:3px;align-self:stretch;flex-shrink:0;}
.clsname{font-size:15px;font-weight:700;}
.clsmeta{font-size:12px;color:#6B7280;margin-top:5px;line-height:1.8;}
.clstag{display:inline-block;border-radius:7px;padding:2px 9px;font-size:10px;font-weight:700;letter-spacing:.5px;margin-top:8px;border:1px solid;}
.clscap{text-align:right;flex-shrink:0;}
.clscapn{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;}
.clscapl{font-size:10px;color:#6B7280;}
.capring{width:48px;height:3px;background:rgba(255,255,255,.07);border-radius:2px;margin-top:5px;}
.capfill{height:100%;border-radius:2px;}

/* Pickup card */
.pucard{background:#111827;border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:18px;margin-bottom:12px;transition:border-color .2s;}
.pucard:hover{border-color:rgba(79,195,247,.2);}
.putop{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;}
.puname{font-size:15px;font-weight:700;}
.puinfo{font-size:12px;color:#6B7280;margin-top:4px;line-height:1.8;}
.putimebox{text-align:right;}
.putime{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:#4FC3F7;line-height:1;}
.putimelbl{font-size:10px;color:#6B7280;margin-top:2px;}
.pudiv{height:1px;background:rgba(255,255,255,.07);margin:12px 0;}
.pubot{display:flex;justify-content:space-between;align-items:center;}
.puguard{font-size:12px;color:#6B7280;}
.pubtn{border:none;border-radius:10px;padding:9px 18px;font-size:12px;font-family:'Noto Sans KR';font-weight:700;cursor:pointer;transition:all .2s;}
.pubtn-done{background:rgba(105,240,174,.1);color:#69F0AE;border:1px solid rgba(105,240,174,.25);}
.pubtn-pend{background:#4FC3F7;color:#0A0E1A;}

/* Staff card */
.staffcard{background:#111827;border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:16px;margin-bottom:12px;display:flex;gap:14px;align-items:center;cursor:pointer;transition:all .2s;}
.staffcard:hover{border-color:rgba(79,195,247,.25);transform:translateY(-1px);}
.sav{width:52px;height:52px;border-radius:16px;background:#1C2333;border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;}
.sname{font-size:15px;font-weight:700;}
.srole{font-size:12px;color:#6B7280;margin-top:2px;}
.sdays{display:flex;gap:4px;margin-top:8px;}
.sday{width:24px;height:24px;border-radius:7px;background:#1C2333;color:#6B7280;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;}
.sday.on{background:rgba(79,195,247,.18);color:#4FC3F7;}
.sbadge{padding:4px 10px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.5px;}
.sbadge-on{background:rgba(105,240,174,.1);color:#69F0AE;border:1px solid rgba(105,240,174,.25);}
.sbadge-off{background:rgba(255,213,79,.09);color:#FFD54F;border:1px solid rgba(255,213,79,.22);}

/* Member card */
.memcard{background:#111827;border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:14px 16px;margin-bottom:10px;display:flex;align-items:center;gap:14px;transition:border-color .2s;}
.memcard:hover{border-color:rgba(79,195,247,.18);}
.meminit{width:44px;height:44px;border-radius:13px;background:linear-gradient(135deg,rgba(79,195,247,.28),rgba(0,229,255,.12));border:1px solid rgba(79,195,247,.2);color:#4FC3F7;font-family:'Syne',sans-serif;font-size:18px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.memname{font-size:14px;font-weight:700;}
.memsub{font-size:11px;color:#6B7280;margin-top:3px;}
.memplan{display:inline-block;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700;background:rgba(79,195,247,.1);color:#4FC3F7;border:1px solid rgba(79,195,247,.2);margin-top:4px;}
.memact{color:#69F0AE;font-size:10px;font-weight:700;}
.memexp{color:#FF6E6E;font-size:10px;font-weight:700;}

/* Search */
.srch{background:#111827;border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:12px 16px;display:flex;align-items:center;gap:10px;margin-bottom:14px;}
.srch input{flex:1;background:none;border:none;outline:none;color:#F0F4FF;font-size:14px;font-family:'Noto Sans KR';}
.srch input::placeholder{color:#6B7280;}

/* View toggle */
.vtog{display:flex;background:#111827;border:1px solid rgba(255,255,255,.07);border-radius:13px;padding:4px;gap:4px;margin-bottom:16px;}
.vtbtn{flex:1;padding:9px;border:none;background:none;color:#6B7280;font-size:12px;font-family:'Noto Sans KR';font-weight:700;border-radius:9px;cursor:pointer;transition:all .2s;}
.vtbtn.on{background:rgba(79,195,247,.13);color:#4FC3F7;border:1px solid rgba(79,195,247,.25);}

/* Instructor cards */
.instcard{background:#111827;border:1px solid rgba(255,255,255,.07);border-radius:20px;margin-bottom:14px;overflow:hidden;cursor:pointer;transition:border-color .2s;}
.instcard:hover{border-color:rgba(79,195,247,.25);}
.insthdr{padding:18px 20px;display:flex;align-items:center;gap:14px;background:linear-gradient(135deg,rgba(79,195,247,.07),rgba(0,229,255,.03));border-bottom:1px solid rgba(255,255,255,.07);}
.instav{width:50px;height:50px;border-radius:15px;background:#1C2333;border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;font-size:24px;}
.instname{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;}
.instrole{font-size:11px;color:#6B7280;margin-top:3px;}
.instsumm{display:flex;border-bottom:1px solid rgba(255,255,255,.07);}
.instsi{flex:1;text-align:center;padding:14px 8px;}
.instsi+.instsi{border-left:1px solid rgba(255,255,255,.07);}
.instsn{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#4FC3F7;}
.instsl{font-size:10px;color:#6B7280;margin-top:2px;}
.instlbl{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#4B5563;padding:14px 18px 6px;}
.instcr{display:flex;align-items:center;gap:12px;padding:10px 18px;border-bottom:1px solid rgba(255,255,255,.04);}
.instcdot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.instcname{font-size:13px;font-weight:600;flex:1;}
.instcsub{font-size:11px;color:#6B7280;}
.instccnt{font-family:'Syne',sans-serif;font-size:13px;font-weight:800;color:#4FC3F7;white-space:nowrap;}
.instmr{display:flex;align-items:center;gap:12px;padding:10px 18px;border-bottom:1px solid rgba(255,255,255,.04);}
.instmav{width:32px;height:32px;border-radius:9px;background:rgba(79,195,247,.14);color:#4FC3F7;font-family:'Syne',sans-serif;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;}

/* Back btn */
.backbtn{display:flex;align-items:center;gap:6px;background:none;border:none;color:#4FC3F7;font-size:13px;font-weight:600;font-family:'Noto Sans KR';cursor:pointer;margin-bottom:16px;padding:0;}

/* Empty */
.empty{text-align:center;padding:50px 20px;color:#6B7280;}
.emptyic{font-size:44px;margin-bottom:12px;opacity:.4;}

/* Modal */
.movlay{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.75);backdrop-filter:blur(10px);display:flex;align-items:flex-end;}
.modal{background:#111827;border-radius:28px 28px 0 0;padding:28px 20px;width:100%;max-height:88vh;overflow-y:auto;border-top:1px solid rgba(255,255,255,.1);}
.modal-title{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;margin-bottom:22px;}
.fgrp{margin-bottom:16px;}
.flbl{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6B7280;margin-bottom:8px;display:block;}
.finp{width:100%;padding:13px 15px;background:#1C2333;border:1px solid rgba(255,255,255,.1);border-radius:12px;font-size:14px;font-family:'Noto Sans KR';color:#F0F4FF;outline:none;transition:border-color .2s;}
.finp:focus{border-color:#4FC3F7;}
.finp option{background:#1C2333;}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.subbtn{width:100%;padding:15px;background:#4FC3F7;color:#0A0E1A;border:none;border-radius:14px;font-size:15px;font-family:'Noto Sans KR';font-weight:700;cursor:pointer;margin-top:10px;}
.canbtn{width:100%;padding:13px;background:#1C2333;color:#6B7280;border:1px solid rgba(255,255,255,.08);border-radius:14px;font-size:14px;font-family:'Noto Sans KR';cursor:pointer;margin-top:8px;}
`;

export default function App() {
  const [tab, setTab] = useState("schedule");
  const [selDay, setSelDay] = useState("월");
  const [puDay, setPuDay] = useState("화");
  const [classes, setClasses] = useState(initialClasses);
  const [staff, setStaff] = useState(initialStaff);
  const [pickups, setPickups] = useState(initialPickups);
  const [members, setMembers] = useState(initialMembers);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [q, setQ] = useState("");
  const [staffView, setStaffView] = useState("list");
  const [selInst, setSelInst] = useState(null);

  const today = new Date();
  const dateStr = `${today.getFullYear()}.${String(today.getMonth()+1).padStart(2,"0")}.${String(today.getDate()).padStart(2,"0")}`;
  const dayNames = ["일","월","화","수","목","금","토"];
  const todayDay = dayNames[today.getDay()];

  const f = (k,v) => setForm(p=>({...p,[k]:v}));

  const navItems = [
    {id:"schedule",icon:"📅",label:"스케줄"},
    {id:"pickup",icon:"🚗",label:"픽업"},
    {id:"staff",icon:"👥",label:"직원"},
    {id:"members",icon:"🏊",label:"회원"},
  ];

  const filteredMembers = members.filter(m => m.name.includes(q)||m.plan.includes(q)||m.instructor.includes(q));
  const instructors = staff.filter(s => s.role.includes("강사"));

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="blob b1"/><div className="blob b2"/><div className="blob b3"/>
        <div className="wrap">

          {/* Header */}
          <div className="hdr">
            <div className="hdr-eye">AQUA MANAGER</div>
            <div className="hdr-title">수영장 <em>관리</em> 시스템</div>
            <div className="hdr-date">{dateStr} ({todayDay}요일)</div>
          </div>

          {/* Stats */}
          <div className="stats">
            <div className="stat" style={{"--c":"#4FC3F7"}}><div className="stat-n">{classes.length}</div><div className="stat-l">수업</div></div>
            <div className="stat" style={{"--c":"#69F0AE"}}><div className="stat-n">{staff.filter(s=>s.status==="근무중").length}</div><div className="stat-l">근무중</div></div>
            <div className="stat" style={{"--c":"#CE93D8"}}><div className="stat-n">{members.filter(m=>m.status==="활성").length}</div><div className="stat-l">활성회원</div></div>
            <div className="stat" style={{"--c":"#FF6E6E"}}><div className="stat-n">{pickups.filter(p=>p.status==="대기").length}</div><div className="stat-l">픽업대기</div></div>
          </div>

          {/* SCHEDULE */}
          {tab==="schedule" && (
            <div className="sec">
              <div className="sec-hdr">
                <div className="sec-title">수업 스케줄</div>
                <button className="addbtn" onClick={()=>{setModal("class");setForm({});}}>＋ 추가</button>
              </div>
              <div className="dtabs">
                {DAYS.map(d=><button key={d} className={`dtab${selDay===d?" on":""}`} onClick={()=>setSelDay(d)}>{d}</button>)}
              </div>
              {classes.filter(c=>c.day===selDay).length===0
                ? <div className="empty"><div className="emptyic">🏊</div>이 날은 수업이 없어요</div>
                : classes.filter(c=>c.day===selDay).map(cls=>(
                  <div key={cls.id} className="clscard">
                    <div className="clsglow" style={{background:`linear-gradient(90deg,transparent,${cls.color},transparent)`}}/>
                    <div className="clsbar" style={{background:cls.color}}/>
                    <div style={{flex:1}}>
                      <div className="clsname">{cls.name}</div>
                      <div className="clsmeta">⏰ {cls.time} · {cls.duration}분<br/>🏊 {cls.lane} · 👤 {cls.instructor}</div>
                      <div className="clstag" style={{color:cls.color,borderColor:cls.color+"55",background:cls.color+"11"}}>{cls.day}요일</div>
                    </div>
                    <div className="clscap">
                      <div className="clscapn" style={{color:cls.color}}>{cls.enrolled}<span style={{fontSize:13,color:"#6B7280"}}>/{cls.capacity}</span></div>
                      <div className="clscapl">수강인원</div>
                      <div className="capring"><div className="capfill" style={{width:`${cls.enrolled/cls.capacity*100}%`,background:cls.color}}/></div>
                    </div>
                  </div>
                ))
              }
            </div>
          )}

          {/* PICKUP */}
          {tab==="pickup" && (
            <div className="sec">
              <div className="sec-hdr">
                <div className="sec-title">픽업 시간표</div>
                <button className="addbtn" onClick={()=>{setModal("pickup");setForm({});}}>＋ 추가</button>
              </div>
              <div className="dtabs">
                {DAYS.map(d=><button key={d} className={`dtab${puDay===d?" on":""}`} onClick={()=>setPuDay(d)}>{d}</button>)}
              </div>
              {pickups.filter(p=>p.day===puDay).length===0
                ? <div className="empty"><div className="emptyic">🚗</div>이 날은 픽업 일정이 없어요</div>
                : pickups.filter(p=>p.day===puDay).map(p=>(
                  <div key={p.id} className="pucard">
                    <div className="putop">
                      <div>
                        <div className="puname">🧒 {p.member}</div>
                        <div className="puinfo">📞 {p.phone}<br/>🚗 담당: {p.driver}<br/>📍 {p.address}</div>
                      </div>
                      <div className="putimebox">
                        <div className="putime">{p.pickupTime}</div>
                        <div className="putimelbl">픽업시간</div>
                      </div>
                    </div>
                    <div className="pudiv"/>
                    <div className="pubot">
                      <div className="puguard">보호자: {p.guardian}</div>
                      <button
                        className={`pubtn ${p.status==="완료"?"pubtn-done":"pubtn-pend"}`}
                        onClick={()=>setPickups(prev=>prev.map(x=>x.id===p.id?{...x,status:x.status==="완료"?"대기":"완료"}:x))}
                      >{p.status==="완료"?"✅ 완료됨":"픽업 완료"}</button>
                    </div>
                  </div>
                ))
              }
            </div>
          )}

          {/* STAFF */}
          {tab==="staff" && (
            <div className="sec">
              <div className="sec-hdr">
                <div className="sec-title">직원 관리</div>
                <button className="addbtn" onClick={()=>{setModal("staff");setForm({});}}>＋ 추가</button>
              </div>
              <div className="vtog">
                <button className={`vtbtn${staffView==="list"?" on":""}`} onClick={()=>{setStaffView("list");setSelInst(null);}}>👥 전체 직원</button>
                <button className={`vtbtn${staffView==="inst"?" on":""}`} onClick={()=>setStaffView("inst")}>📋 강사별 회원</button>
              </div>

              {staffView==="list" && staff.map(s=>(
                <div key={s.id} className="staffcard" onClick={()=>{setSelInst(s);setStaffView("inst");}}>
                  <div className="sav">{s.avatar}</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div className="sname">{s.name}</div>
                      <span className={`sbadge ${s.status==="근무중"?"sbadge-on":"sbadge-off"}`}>{s.status}</span>
                    </div>
                    <div className="srole">{s.role} · {s.startTime}~{s.endTime}</div>
                    <div className="sdays">{DAYS.map(d=><div key={d} className={`sday${s.workDays.includes(d)?" on":""}`}>{d}</div>)}</div>
                  </div>
                  <div style={{color:"#374151",fontSize:20}}>›</div>
                </div>
              ))}

              {staffView==="inst" && (()=>{
                if (selInst) {
                  const ic = classes.filter(c=>c.instructor===selInst.name);
                  const im = members.filter(m=>m.instructor===selInst.name);
                  return (
                    <>
                      <button className="backbtn" onClick={()=>setSelInst(null)}>← 목록으로</button>
                      <div className="instcard" style={{cursor:"default"}}>
                        <div className="insthdr">
                          <div className="instav">{selInst.avatar}</div>
                          <div style={{flex:1}}>
                            <div className="instname">{selInst.name}</div>
                            <div className="instrole">{selInst.role} · {selInst.startTime}~{selInst.endTime}</div>
                            <div style={{fontSize:11,color:"#6B7280",marginTop:3}}>📞 {selInst.phone}</div>
                          </div>
                          <span className={`sbadge ${selInst.status==="근무중"?"sbadge-on":"sbadge-off"}`}>{selInst.status}</span>
                        </div>
                        <div className="instsumm">
                          <div className="instsi"><div className="instsn">{ic.length}</div><div className="instsl">담당수업</div></div>
                          <div className="instsi"><div className="instsn">{ic.reduce((a,c)=>a+c.enrolled,0)}</div><div className="instsl">총수강생</div></div>
                          <div className="instsi"><div className="instsn">{im.filter(m=>m.status==="활성").length}</div><div className="instsl">활성회원</div></div>
                        </div>
                        <div className="instlbl">담당 수업</div>
                        {ic.length===0?<div style={{padding:"12px 18px",color:"#6B7280",fontSize:13}}>없음</div>
                          :ic.map(cls=>(
                            <div key={cls.id} className="instcr">
                              <div className="instcdot" style={{background:cls.color}}/>
                              <div style={{flex:1}}>
                                <div className="instcname">{cls.name}</div>
                                <div className="instcsub">{cls.day}요일 {cls.time} · {cls.lane}</div>
                              </div>
                              <div>
                                <div className="instccnt">{cls.enrolled}/{cls.capacity}명</div>
                                <div style={{width:48,height:3,background:"rgba(255,255,255,.06)",borderRadius:2,marginTop:4}}>
                                  <div style={{width:`${cls.enrolled/cls.capacity*100}%`,height:"100%",background:cls.color,borderRadius:2}}/>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                        <div className="instlbl" style={{marginTop:6}}>담당 회원</div>
                        {im.length===0?<div style={{padding:"12px 18px",color:"#6B7280",fontSize:13}}>없음</div>
                          :im.map(m=>(
                            <div key={m.id} className="instmr">
                              <div className="instmav">{m.name[0]}</div>
                              <div style={{flex:1}}>
                                <div style={{fontSize:13,fontWeight:700}}>{m.name} <span style={{fontSize:11,color:"#6B7280",fontWeight:400}}>{m.age}세</span></div>
                                <div style={{fontSize:11,color:"#6B7280"}}>{m.plan} · {m.since}</div>
                              </div>
                              <div className={m.status==="활성"?"memact":"memexp"}>{m.status==="활성"?"● 활성":"● 만료"}</div>
                            </div>
                          ))
                        }
                        <div style={{height:16}}/>
                      </div>
                    </>
                  );
                }
                return instructors.map(s=>{
                  const ic=classes.filter(c=>c.instructor===s.name);
                  const im=members.filter(m=>m.instructor===s.name&&m.status==="활성");
                  return (
                    <div key={s.id} className="instcard" onClick={()=>setSelInst(s)}>
                      <div className="insthdr">
                        <div className="instav">{s.avatar}</div>
                        <div style={{flex:1}}><div className="instname">{s.name}</div><div className="instrole">{s.role}</div></div>
                        <span className={`sbadge ${s.status==="근무중"?"sbadge-on":"sbadge-off"}`}>{s.status}</span>
                      </div>
                      <div className="instsumm">
                        <div className="instsi"><div className="instsn">{ic.length}</div><div className="instsl">수업 수</div></div>
                        <div className="instsi"><div className="instsn">{ic.reduce((a,c)=>a+c.enrolled,0)}</div><div className="instsl">총수강생</div></div>
                        <div className="instsi"><div className="instsn">{im.length}</div><div className="instsl">활성회원</div></div>
                        <div style={{display:"flex",alignItems:"center",paddingRight:16,color:"#374151",fontSize:20}}>›</div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          )}

          {/* MEMBERS */}
          {tab==="members" && (
            <div className="sec">
              <div className="sec-hdr">
                <div className="sec-title">회원 관리</div>
                <button className="addbtn" onClick={()=>{setModal("member");setForm({});}}>＋ 추가</button>
              </div>
              <div className="srch">
                <span style={{color:"#6B7280"}}>🔍</span>
                <input placeholder="이름, 수강권, 강사 검색..." value={q} onChange={e=>setQ(e.target.value)}/>
              </div>
              {filteredMembers.map(m=>(
                <div key={m.id} className="memcard">
                  <div className="meminit">{m.name[0]}</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div className="memname">{m.name}</div>
                      <span className={m.status==="활성"?"memact":"memexp"}>{m.status==="활성"?"● 활성":"● 만료"}</span>
                    </div>
                    <div className="memplan">{m.plan}</div>
                    <div className="memsub">강사: {m.instructor} · {m.since}</div>
                  </div>
                  <div style={{fontSize:12,color:"#6B7280"}}>{m.age}세</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="nav">
          {navItems.map(n=>(
            <button key={n.id} className={`nb${tab===n.id?" on":""}`} onClick={()=>setTab(n.id)}>
              <div className="niw">{n.icon}</div>{n.label}
            </button>
          ))}
        </nav>

        {/* Modal */}
        {modal && (
          <div className="movlay" onClick={()=>setModal(null)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div className="modal-title">
                {modal==="class"&&"📅 수업 추가"}{modal==="pickup"&&"🚗 픽업 추가"}
                {modal==="staff"&&"👤 직원 추가"}{modal==="member"&&"🏊 회원 추가"}
              </div>

              {modal==="class" && <>
                <div className="fgrp"><label className="flbl">수업명</label><input className="finp" placeholder="예: 아침 수영반" onChange={e=>f("name",e.target.value)}/></div>
                <div className="frow">
                  <div className="fgrp"><label className="flbl">요일</label><select className="finp" onChange={e=>f("day",e.target.value)}>{DAYS.map(d=><option key={d}>{d}</option>)}</select></div>
                  <div className="fgrp"><label className="flbl">시간</label><select className="finp" onChange={e=>f("time",e.target.value)}>{TIMES.map(t=><option key={t}>{t}</option>)}</select></div>
                </div>
                <div className="frow">
                  <div className="fgrp"><label className="flbl">강사</label><select className="finp" onChange={e=>f("instructor",e.target.value)}>{staff.map(s=><option key={s.id}>{s.name}</option>)}</select></div>
                  <div className="fgrp"><label className="flbl">레인</label><input className="finp" placeholder="1레인" onChange={e=>f("lane",e.target.value)}/></div>
                </div>
                <div className="frow">
                  <div className="fgrp"><label className="flbl">시간(분)</label><input className="finp" type="number" placeholder="60" onChange={e=>f("duration",+e.target.value)}/></div>
                  <div className="fgrp"><label className="flbl">정원</label><input className="finp" type="number" placeholder="10" onChange={e=>f("capacity",+e.target.value)}/></div>
                </div>
                <button className="subbtn" onClick={()=>{if(!form.name)return;setClasses(p=>[...p,{id:Date.now(),enrolled:0,color:ACCENT,day:"월",time:"09:00",duration:60,capacity:10,lane:"-",instructor:staff[0]?.name||"-",...form}]);setModal(null);}}>수업 추가하기</button>
              </>}

              {modal==="pickup" && <>
                <div className="fgrp"><label className="flbl">학생 이름 (나이)</label><input className="finp" placeholder="예: 김태양 (7세)" onChange={e=>f("member",e.target.value)}/></div>
                <div className="frow">
                  <div className="fgrp"><label className="flbl">보호자</label><input className="finp" placeholder="김부모" onChange={e=>f("guardian",e.target.value)}/></div>
                  <div className="fgrp"><label className="flbl">연락처</label><input className="finp" placeholder="010-0000-0000" onChange={e=>f("phone",e.target.value)}/></div>
                </div>
                <div className="frow">
                  <div className="fgrp"><label className="flbl">픽업 요일</label><select className="finp" onChange={e=>f("day",e.target.value)}>{DAYS.map(d=><option key={d}>{d}</option>)}</select></div>
                  <div className="fgrp"><label className="flbl">픽업 시간</label><select className="finp" onChange={e=>f("pickupTime",e.target.value)}>{TIMES.map(t=><option key={t}>{t}</option>)}</select></div>
                </div>
                <div className="fgrp"><label className="flbl">담당 직원</label><select className="finp" onChange={e=>f("driver",e.target.value)}>{staff.map(s=><option key={s.id}>{s.name}</option>)}</select></div>
                <div className="fgrp"><label className="flbl">주소</label><input className="finp" placeholder="픽업 주소" onChange={e=>f("address",e.target.value)}/></div>
                <button className="subbtn" onClick={()=>{if(!form.member)return;setPickups(p=>[...p,{id:Date.now(),status:"대기",day:"월",pickupTime:"10:00",driver:staff[0]?.name||"-",...form}]);setModal(null);}}>픽업 추가하기</button>
              </>}

              {modal==="staff" && <>
                <div className="frow">
                  <div className="fgrp"><label className="flbl">이름</label><input className="finp" placeholder="홍길동" onChange={e=>f("name",e.target.value)}/></div>
                  <div className="fgrp"><label className="flbl">역할</label><input className="finp" placeholder="수영 강사" onChange={e=>f("role",e.target.value)}/></div>
                </div>
                <div className="fgrp"><label className="flbl">연락처</label><input className="finp" placeholder="010-0000-0000" onChange={e=>f("phone",e.target.value)}/></div>
                <div className="frow">
                  <div className="fgrp"><label className="flbl">출근</label><select className="finp" onChange={e=>f("startTime",e.target.value)}>{TIMES.map(t=><option key={t}>{t}</option>)}</select></div>
                  <div className="fgrp"><label className="flbl">퇴근</label><select className="finp" onChange={e=>f("endTime",e.target.value)}>{TIMES.map(t=><option key={t}>{t}</option>)}</select></div>
                </div>
                <button className="subbtn" onClick={()=>{if(!form.name)return;setStaff(p=>[...p,{id:Date.now(),status:"근무중",workDays:[],avatar:"👤",startTime:"09:00",endTime:"18:00",...form}]);setModal(null);}}>직원 추가하기</button>
              </>}

              {modal==="member" && <>
                <div className="frow">
                  <div className="fgrp"><label className="flbl">이름</label><input className="finp" placeholder="홍길동" onChange={e=>f("name",e.target.value)}/></div>
                  <div className="fgrp"><label className="flbl">나이</label><input className="finp" type="number" placeholder="30" onChange={e=>f("age",+e.target.value)}/></div>
                </div>
                <div className="fgrp"><label className="flbl">연락처</label><input className="finp" placeholder="010-0000-0000" onChange={e=>f("phone",e.target.value)}/></div>
                <div className="frow">
                  <div className="fgrp"><label className="flbl">수강권</label><select className="finp" onChange={e=>f("plan",e.target.value)}>{["월정기","3개월","자유수영","어린이반"].map(p=><option key={p}>{p}</option>)}</select></div>
                  <div className="fgrp"><label className="flbl">담당 강사</label><select className="finp" onChange={e=>f("instructor",e.target.value)}><option>-</option>{staff.map(s=><option key={s.id}>{s.name}</option>)}</select></div>
                </div>
                <button className="subbtn" onClick={()=>{if(!form.name)return;const now=new Date();setMembers(p=>[...p,{id:Date.now(),status:"활성",plan:"월정기",instructor:"-",since:`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}`,...form}]);setModal(null);}}>회원 추가하기</button>
              </>}

              <button className="canbtn" onClick={()=>setModal(null)}>취소</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
