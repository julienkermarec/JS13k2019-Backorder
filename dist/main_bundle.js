!function(t){var e={};function i(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=e,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(o,r,function(e){return t[e]}.bind(null,r));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,i){function o(t,e,i=null,o=null,r=null){return object=document.createElement(t),object.setAttribute("text",e),object.setAttribute("position",i),object.setAttribute("rotation",o),object.setAttribute("scale",r),object}function r(t,e=1,i=1,o=null,r=null,n=null,l=null,c=null,a=null){return object=document.createElement(t),object.setAttribute("width",e),object.setAttribute("height",i),object.setAttribute("depth",o),object.setAttribute("position",r),object.setAttribute("rotation",n),object.setAttribute("scale",l),object.setAttribute("color",c),object.setAttribute("opacity",null!=a?a:1),object}function n(){for(let t=0;t<36;t++){for(eb=document.getElementById("box_"+t),m=-.55,t%2!=0&&(m=.55),rh=.1*(3.7+Math.floor(7.5*Math.random())+1),rw=.1*(3.2+Math.floor(7.5*Math.random())+1),numb=Math.random().toString().slice(2,5),airport=null;null==airport||airport.city.length/30>rw;)airport=a(),text=airport.code,destination=airport.country,city=airport.city;key=text+numb,colors=["#EDD19F","brown","orange"];let e=colors[c(colors)];eb.innerHTML="",b2=r("a-box",.03,.3,.4,"0.4 0 0","0 0 0",null,"black"),b3=r("a-box",.03,.07,rw,"0.4 0.2 0","0 0 0",null,"white"),t2=o("a-text","anchor:align;width:3.3;color:white;value:"+text+";align:center;shader:sdf","0.02 0.06 0","0 90 0","1 1 1"),t3=o("a-text","anchor:align;width:3.3;color:white;value:"+numb+";align:center;shader:sdf","0.02 -0.06 0","0 90 0","1 1 1"),t4=o("a-text","anchor:align;width:1.5;color:black;value:"+city+";align:center;shader:sdf","0.02 0 0","0 90 0","1 1 1"),b3.appendChild(t4),b2.appendChild(t2),b2.appendChild(t3),eb.removeEventListener("click",()=>{}),eb.innerHTML="",eb.appendChild(b2),eb.appendChild(b3),eb.setAttribute("geometry","primitive: box; width: 0.8; height: "+rh+"; depth: "+rw),eb.setAttribute("material","color: "+e+"; opacity: 1; shader: flat"),eb.setAttribute("position","0 "+rh/2+" "+m),eb.setAttribute("visible","true"),eb.setAttribute("data-text",text),eb.setAttribute("data-numb",numb),eb.setAttribute("data-height",rh),eb.setAttribute("data-width",rw),eb.setAttribute("data-depth",.8),eb.setAttribute("data-color",e),eb.setAttribute("data-key",key),eb.setAttribute("data-city",airport.city),eb.setAttribute("data-country",airport.country),eb.setAttribute("data-title",airport.title),boxs.push({text:text,numb:numb,country:airport.country,city:airport.city,title:airport.title,key:key})}}function l(t,e){console.log("playError",e),score-=e,d(),document.getElementById("error_text").setAttribute("text","anchor:align;width:2.8;color:white;value:"+t+";align:center;shader:sdf"),document.getElementById("error").setAttribute("visible","true"),setTimeout(()=>{document.getElementById("error").setAttribute("visible","false")},800)}function c(t){return Math.floor(Math.random()*t.length)}function a(){let t,e,i=Math.floor(3*Math.random());return 0==i&&(e="france"),1==i&&(e="germany"),2==i&&(e="italy"),t=Math.floor(Math.random()*airports[e].length),{country:e,code:airports[e][t].code,title:airports[e][t].title,city:airports[e][t].city}}function d(){console.log("updateScore",score),document.getElementById("score").setAttribute("text","anchor:align;width:1.2;color:white;value:Score : "+score+";align:center;shader:sdf")}function s(){orders=[],boxs=[],boxs_left=[],in_hand=null,nb_order_completed=0,score=0,d(),document.getElementById("level").setAttribute("text","anchor:align;width:1.2;color:white;value:Level "+level+";align:center;shader:sdf"),console.log("start",level),n(),document.getElementById("menu").setAttribute("visible","false"),document.getElementById("menu").setAttribute("position","0 4.75 -0.65"),document.getElementById("menu_home").setAttribute("visible","false"),document.getElementById("menu_score").setAttribute("visible","false"),document.getElementById("menu_instructions").setAttribute("visible","false"),countdown=default_countdown,console.log("start countdown",countdown),document.getElementById("view_countdown_text").setAttribute("text","anchor:align;width:7;color:black;value:"+countdown+";align:center;shader:sdf"),document.getElementById("view_countdown").setAttribute("visible","true"),document.getElementById("camera").setAttribute("wasd-controls","acceleration: 180"),interval_countdown=setInterval(()=>{console.log("countdown",countdown),countdown--,document.getElementById("view_countdown_text").setAttribute("text","anchor:align;width:7;color:black;value:"+countdown+";align:center;shader:sdf"),0==countdown&&(console.log("clear interval"),clearInterval(interval_countdown),document.getElementById("view_countdown").setAttribute("visible","false"),countdown=null,function(){console.log("--- launch ----- "),nb_orders=0+4*level,boxs_left=JSON.parse(JSON.stringify(boxs));for(let t=0;t<nb_orders;t++)b();timer_countdown=timer,timer_interval=setInterval(()=>{timer_countdown--,width=timer_countdown/timer*.285,left=width/2-.1425,timer_element=document.getElementById("timer"),timer_element.setAttribute("position",left+" -0.002 0.002"),timer_element.setAttribute("width",width),timer_element.setAttribute("visible","true"),0==timer_countdown&&(l("finished",0),clearInterval(timer_interval),timer_element.setAttribute("visible","false"),u())},1e3)}())},1e3)}function u(){document.getElementById("view_orders_list").innerHTML="",document.getElementById("view_orders_list").setAttribute("position","0 0 0"),document.getElementById("menu").setAttribute("visible","true"),document.getElementById("menu").setAttribute("position","0 1.75 -0.65"),document.getElementById("menu_score").setAttribute("visible","true"),document.getElementById("menu_score").setAttribute("position","0 0 0.05"),elements=["menu_score_level","menu_score_score","menu_score_timer"],title=timer_countdown>0?"ORDERS COMPLETED !":nb_orders-nb_order_completed+" ORDERS LEFT !",document.getElementById("menu_score_title").setAttribute("text","anchor:align;width:2.5;color:white;value:"+title+";align:center;shader:sdf");for(let t of elements)text="menu_score_level"==t?"Level : "+level:"menu_score_score"==t?"Score : "+score:timer_countdown>0?"Time : "+(timer-timer_countdown)+"seconds":nb_order_completed+"/"+nb_orders+" orders",document.getElementById(t).setAttribute("text","anchor:align;lineHeight: 40; wrapCount: 30; width:1.3;color:white;value:"+text+";align:center;shader:sdf");text=timer_countdown>0?"Next level ->":"<- Retry",document.getElementById("menu_score_button").setAttribute("text","anchor:align;width:2.1;color:white;value:"+text+";align:center;shader:sdf");let t=document.getElementById("camera").getAttribute("rotation");console.log("rotation",t),document.getElementById("camera").setAttribute("position","0 2.02 0"),document.getElementById("camera").removeAttribute("wasd-controls"),document.getElementById("rig").setAttribute("rotation","0 "+-1*t.y+" 0")}function b(){random_index=c(boxs_left),box=boxs_left[random_index],boxs_left.splice(random_index,1),left=orders.length>0?.3*orders.length:0,oe=document.createElement("a-entity"),oe.setAttribute("position",left+" -0.152 0"),oe.setAttribute("id","order_"+box.key),ob=r("a-box",.2,.15,.01,null,null,null,"black"),obt1=o("a-text","anchor:align;width:1.2;color:white;value:"+box.text+";align:center;shader:sdf","0 0.03 0.007",null,null),obt2=o("a-text","anchor:align;width:1.2;color:white;value:"+box.numb+";align:center;shader:sdf","0 -0.035 0.007",null,null),ob.appendChild(obt1),ob.appendChild(obt2),oe.appendChild(ob),document.getElementById("view_orders_list").appendChild(oe),orders.push(box)}hand=null,boxs=[],boxs_left=[],in_hand=null,orders=[],nb_orders=null,score=0,nb_order_completed=0,level=1,timer=120,timer_countdown=null,timer_interval=null,default_countdown=1,AFRAME.registerComponent("play-listener",{init:function(){console.log("init play-listener "),countdown=null,this.el.addEventListener("click",t=>{console.log("play-listener click"),console.log("play-listener countdown",countdown),null==countdown&&(document.getElementById("camera").setAttribute("wasd-controls",""),document.getElementById("menu").setAttribute("visible","false"),document.getElementById("menu").setAttribute("position","0 4.75 0.5"),document.getElementById("menu_home").setAttribute("visible","false"),document.getElementById("menu_home").setAttribute("position","0 0 0"),document.getElementById("view_countdown_text").setAttribute("text","anchor:align;width:7;color:black;value:"+countdown+";align:center;shader:sdf"),s())})}}),AFRAME.registerComponent("cursor-listener",{init:function(){var t=["red","green","blue","purple","pink","gray","brown"];this.el.addEventListener("click",function(e){var i=Math.floor(Math.random()*t.length);this.setAttribute("material","color",t[i]),console.log("I was clicked at: ",e.detail.intersection.point)})}}),AFRAME.registerComponent("instructions-listener",{init:function(){console.log("init instructions-listener"),this.el.addEventListener("click",t=>{console.log("click instructions-listener"),setTimeout(()=>{menu&&(document.getElementById("menu_home").setAttribute("visible","false"),document.getElementById("menu_home").setAttribute("position","0 5 0"),document.getElementById("menu_instructions").setAttribute("visible","true"),document.getElementById("menu_instructions").setAttribute("position","0 0 0.05"))},50)})}}),AFRAME.registerComponent("back-listener",{init:function(){console.log("init back-listener"),this.el.addEventListener("click",t=>{console.log("click back-listener"),setTimeout(()=>{document.getElementById("menu_instructions").setAttribute("visible","false"),document.getElementById("menu_instructions").setAttribute("position","0 5 0"),document.getElementById("menu_home").setAttribute("visible","true"),document.getElementById("menu_home").setAttribute("position","0 0 0.05")},50)}),function(){hl=document.getElementById("hl"),hr=document.getElementById("hr"),hb=document.getElementById("hb"),hbc=document.getElementById("hbc"),hbt1=document.getElementById("hbt1"),hbt2=document.getElementById("hbt2"),hbcity=document.getElementById("hbcity"),hbcityt=document.getElementById("hbcityt"),document.getElementById("etageres")&&(document.getElementById("etageres").innerHTML=""),console.log("initEtageres"),box_id=0,etageres=[["0 0 0","0 0 0"],["0 0 0","0 -180 0"],["0 0 0","0 90 0"],["0 0 2.5","0 0 0"],["0 0 -2.5","0 -180 0"],["2.5 0 0","0 90 0"]];for(let t of etageres){e=document.createElement("a-entity"),e.setAttribute("position",t[0]),e.setAttribute("rotation",t[1]),ppos=["-2.6 1.5 -2.4","-2.6 1.5 -0.1","-3.9 1.5 -0.1","-3.9 1.5 -2.4"];for(let t of ppos)f=r("a-box",1,3,1,t,null,"0.1 1 0.1","#A27B4B"),e.appendChild(f);hpos=["0.1","1.3","02.5"];for(let t of hpos)h=r("a-box",1.5,.1,2.5,"-3.25 "+t+" -1.250",null,"1 1 1","black"),e.appendChild(h);hpos=["0.1","1.3","02.5"];for(let t of hpos){h=r("a-box",1.5,.1,2.5,"-3.25 "+t+" -1.250",null,"1 1 1","black");for(let t of[0,1])eb=document.createElement("a-entity"),eb.classList.add("clickable"),eb.setAttribute("mixin","box"),eb.id="box_"+box_id,eb.addEventListener("click",function(t){0!=orders.length&&(console.log("----------------------"),console.log("eb-click this",this),console.log("eb-click evt",t),key=this.getAttribute("data-key"),color=this.getAttribute("data-color"),null!=in_hand?this.id==in_hand?(this.setAttribute("material","color: "+color+"; opacity: 1; shader: flat"),this.childNodes[0].setAttribute("visible","true"),this.childNodes[1].setAttribute("visible","true"),hb.setAttribute("visible","false"),hb.setAttribute("position","0 -4.8 -0.3"),this.setAttribute("material","color: "+color+"; opacity: 1; shader: flat"),in_hand=null):l("Bad place",0):(in_hand=this.id,this.setAttribute("material","color: "+color+"; opacity: 0.3; shader: flat"),this.childNodes[0].setAttribute("visible","false"),this.childNodes[1].setAttribute("visible","false"),hb.setAttribute("visible","true"),hb.setAttribute("position","0 -0.8 -0.3"),hbc.setAttribute("depth",.79),console.log("this.getAttribute('data-depth')",this.getAttribute("data-depth")),hrl="-20 0 0",hrr="-20 0 0",this.getAttribute("data-width")<.5?(hrl="-20 -15 0",hrr="-20 15 0"):this.getAttribute("data-width")<.7?(hrl="-20 -8 0",hrr="-20 8 0"):this.getAttribute("data-width")>.95&&(hrl="-20 8 0",hrr="-20 -8 0"),console.log("hrl",hrl),hl.setAttribute("rotation",hrl),hr.setAttribute("rotation",hrr),hbc.setAttribute("height",this.getAttribute("data-width")),hbc.setAttribute("width",this.getAttribute("data-depth")),hbc.setAttribute("depth",this.getAttribute("data-height")),hbc.setAttribute("color",this.getAttribute("data-color")),hbcity.setAttribute("depth",this.getAttribute("data-width")),hbt1.setAttribute("text","anchor:align;width:3.3;color:white;value:"+this.getAttribute("data-text")+";align:center;shader:sdf"),hbt2.setAttribute("text","anchor:align;width:3.3;color:white;value:"+this.getAttribute("data-numb")+";align:center;shader:sdf"),hbcityt.setAttribute("text","width: 1.5; color: black; value: "+this.getAttribute("data-city")+"; align: center"),console.log("I was clicked at: ",t.detail.intersection.point)))}),box_id++,h.appendChild(eb);e.appendChild(h)}document.getElementById("etageres")&&document.getElementById("etageres").appendChild(e)}}(),n()}}),AFRAME.registerComponent("score-listener",{init:function(){console.log("init score-listener "),this.el.addEventListener("click",t=>{console.log("click score-listener "),setTimeout(()=>{console.log("go to next level ?"),timer_countdown>0?s(level++):s(level)},50)})}}),AFRAME.registerComponent("time-listener",{init:function(){this.el.addEventListener("click",function(t){console.log("time-lsitener this",this.id),console.log("I was clicked at: ",t.detail.intersection.point)})}}),AFRAME.registerComponent("dock-listener",{init:function(){console.log("dock-listener init"),this.el.addEventListener("click",function(t){if(console.log("dock-listener this",this.parentNode.id),console.log("in_hand",in_hand),country=this.parentNode.id,0!=orders.length&&null!=in_hand){if(box_id=in_hand,box_e=document.getElementById(box_id),console.log("boxs",boxs),console.log("nb_order_completed",nb_order_completed),console.log("orders",orders),console.log("box_e.id",box_e.getAttribute("data-key")),console.log("boxs[nb_orders - boxs_left.length].key",boxs[nb_order_completed].key),box_e.getAttribute("data-key").toString()!==orders[nb_order_completed].key.toString())return void l("Bad order",10);if(box_e.getAttribute("data-country")!==this.parentNode.id)return void l("Bad country",10);!function(t){console.log("validOrder",t),element=document.getElementById(t),console.log("element",element),key=element.getAttribute("data-key"),nb_order_completed++,score+=20,d(),document.getElementById("order_"+key).childNodes[0].setAttribute("opacity","0.3"),list=document.getElementById("view_orders_list"),left=-.3*nb_order_completed,list.setAttribute("position",left+" 0 0"),nb_order_completed==nb_orders&&(timer_element=document.getElementById("timer"),clearInterval(timer_interval),timer_element.setAttribute("visible","false"),u())}(box_id),hb=document.getElementById("hb"),dhbct=document.getElementById("hb_"+country),posy=1.255+box_e.getAttribute("data-height")/2,dhbct.setAttribute("position","0 "+posy+" -0.5"),dhbct.setAttribute("visible","true"),dhbct.setAttribute("animation","property: position; to: 0 "+posy+" -1.5; dur: 2000"),box_e.setAttribute("visible","false"),hb.setAttribute("visible","false"),hb.setAttribute("position","0 -4.8 -0.3"),dhbc=document.getElementById("hbc_"+country),dhbt1=document.getElementById("hbt1_"+country),dhbt2=document.getElementById("hbt2_"+country),dhbcity=document.getElementById("hbcity_"+country),dhbcityt=document.getElementById("hbcityt_"+country),dhbc.setAttribute("height",box_e.getAttribute("data-width")),dhbc.setAttribute("width",box_e.getAttribute("data-depth")),dhbc.setAttribute("depth",box_e.getAttribute("data-height")),dhbc.setAttribute("color",box_e.getAttribute("data-color")),dhbt1.setAttribute("text","anchor:align;width:3.3;color:white;value:"+box_e.getAttribute("data-text")+";align:center;shader:sdf"),dhbt2.setAttribute("text","anchor:align;width:3.3;color:white;value:"+box_e.getAttribute("data-numb")+";align:center;shader:sdf"),dhbcity.setAttribute("depth",box_e.getAttribute("data-width")),dhbcityt.setAttribute("text","width: 1.5; color: black; value: "+box_e.getAttribute("data-city")+"; align: center;shader:sdf"),setTimeout(()=>{dhbct.setAttribute("visible","false")},2e3),in_hand=null}})}}),airports={france:[{code:"CDG",title:"Charles de Gaulle International Airport",city:"Paris"},{code:"NCE",title:"Nice-Côte d'Azur Airport",city:"Nice"},{code:"LYS",title:"Lyon Saint-Exupery Airport",city:"Lyon"},{code:"MRS",title:"Marseille Provence Airport",city:"Marseille"},{code:"TLS",title:"Toulouse-Blagnac Airport",city:"Toulouse/Blagnac"},{code:"ORY",title:"Paris-Orly Airport",city:"Paris"},{code:"BSL",title:"EuroAirport Basel-Mulhouse-Freiburg Airport",city:"Bale/Mulhouse"},{code:"BOD",title:"Bordeaux-Merignac Airport",city:"Bordeaux/Merignac"},{code:"NTE",title:"Nantes Atlantique Airport",city:"Nantes"},{code:"SXB",title:"Strasbourg Airport",city:"Strasbourg"},{code:"LIL",title:"Lille-Lesquin Airport",city:"Lille/Lesquin"},{code:"AJA",title:"Ajaccio-Napoleon Bonaparte Airport",city:"Ajaccio/Napoleon Bonaparte"},{code:"BES",title:"Brest Bretagne Airport",city:"Brest/Guipavas"},{code:"BIA",title:"Bastia-Poretta Airport",city:"Bastia/Poretta"},{code:"MPL",title:"Montpellier-Mediterranee Airport",city:"Montpellier/Mediterranee"},{code:"CLY",title:"Calvi-Sainte-Catherine Airport",city:"Calvi/Sainte-Catherine"},{code:"FSC",title:"Figari Sud-Corse Airport",city:"Figari Sud-Corse"},{code:"RNS",title:"Rennes-Saint-Jacques Airport",city:"Rennes/Saint-Jacques"},{code:"BIQ",title:"Biarritz-Anglet-Bayonne Airport",city:"Biarritz/Anglet/Bayonne"},{code:"EGC",title:"Bergerac-Roumanière Airport",city:"Bergerac/Roumanière"},{code:"LIG",title:"Limoges Airport",city:"Limoges/Bellegarde"},{code:"CFE",title:"Clermont-Ferrand Auvergne Airport",city:"Clermont-Ferrand/Auvergne"},{code:"LRH",title:"La Rochelle-Ile de Re Airport",city:"La Rochelle/Ile de Re"},{code:"PUF",title:"Pau Pyrenees Airport",city:"Pau/Pyrenees (Uzein)"},{code:"LDE",title:"Tarbes-Lourdes-Pyrenees Airport",city:"Tarbes/Lourdes/Pyrenees"},{code:"BVE",title:"Brive Souillac Airport",city:"Brive"},{code:"EBU",title:"Saint-etienne-Boutheon Airport",city:"Saint-etienne/Boutheon"},{code:"PGF",title:"Perpignan-Rivesaltes (Llabanère) Airport",city:"Perpignan/Rivesaltes"},{code:"BVA",title:"Paris Beauvais Tille Airport",city:"Beauvais/Tille"},{code:"PIS",title:"Poitiers-Biard Airport",city:"Poitiers/Biard"}],germany:[{code:"FRA",title:"Frankfurt am Main Airport",city:"Frankfurt am Main"},{code:"MUC",title:"Munich Airport",city:"Munich"},{code:"DUS",title:"Dusseldorf Airport",city:"Dusseldorf"},{code:"TXL",title:"Berlin - Tegel Airport",city:"Berlin"},{code:"HAM",title:"Hamburg Airport",city:"Hamburg"},{code:"STR",title:"Stuttgart Airport",city:"Stuttgart"},{code:"CGN",title:"Cologne Bonn Airport",city:"Cologne"},{code:"HAJ",title:"Hannover Airport",city:"Hannover"},{code:"SXF",title:"Berlin - Schonefeld Airport",city:"Berlin"},{code:"NUE",title:"Nuremberg Airport",city:"Nuremberg"},{code:"LEJ",title:"Leipzig / Halle Airport",city:"Leipzig"},{code:"BRE",title:"Bremen Airport",city:"Bremen"},{code:"DRS",title:"Dresden Airport",city:"Dresden"},{code:"DTM",title:"Dortmund Airport",city:"Dortmund"},{code:"FMM",title:"Memmingen Allgau Airport",city:"Memmingen"},{code:"FDH",title:"Friedrichshafen Airport",city:"Friedrichshafen"},{code:"FKB",title:"Karlsruhe Baden - Baden Airport",city:"Baden - Baden"},{code:"FMO",title:"Munster Osnabrück Airport",city:"Münster"},{code:"SCN",title:"Saarbrucken Airport",city:"Saarbrucken"},{code:"PAD",title:"Paderborn Lippstadt Airport",city:"Paderborn"},{code:"GWT",title:"Westerland Sylt Airport",city:"Westerland"},{code:"RLG",title:"Rostock - Laage Airport",city:"Rostock"},{code:"HHN",title:"Frankfurt - Hahn Airport",city:"Frankfurt am Main"},{code:"LBC",title:"Lubeck Blankensee Airport",city:"Lubeck"},{code:"KSF",title:"Kassel - Calden Airport",city:"Kassel"},{code:"HDF",title:"Heringsdorf Airport",city:"Heringsdorf"},{code:"ERF",title:"Erfurt Airport",city:"Erfurt"},{code:"MHG",title:"Mannheim - City Airport",city:"Mannheim"},{code:"NRN",title:"Weeze Airport",city:"Weeze"}],italy:[{code:"FCO",title:"Leonardo da Vinci–Fiumicino Airport",city:"Rome"},{code:"MXP",title:"Malpensa International Airport",city:"Milan"},{code:"VCE",title:"Venice Marco Polo Airport",city:"Venice"},{code:"BLQ",title:"Bologna Guglielmo Marconi Airport",city:"Bologna"},{code:"NAP",title:"Naples International Airport",city:"Napoli"},{code:"CTA",title:"Catania-Fontanarossa Airport",city:"Catania"},{code:"LIN",title:"Milano Linate Airport",city:"Milan"},{code:"TRN",title:"Turin Airport",city:"Torino"},{code:"FLR",title:"Peretola Airport",city:"Firenze"},{code:"VRN",title:"Verona Villafranca Airport",city:"Verona"},{code:"PMO",title:"Falcone–Borsellino Airport",city:"Palermo"},{code:"OLB",title:"Olbia Costa Smeralda Airport",city:"Olbia (SS)"},{code:"PSA",title:"Pisa International Airport",city:"Pisa"},{code:"BRI",title:"Bari Karol Wojtyła Airport",city:"Bari"},{code:"GOA",title:"Genoa Cristoforo Colombo Airport",city:"Genova"},{code:"CAG",title:"Cagliari Elmas Airport",city:"Cagliari"},{code:"SUF",title:"Lamezia Terme Airport",city:"Lamezia Terme (CZ)"},{code:"BGY",title:"Il Caravaggio International Airport",city:"Bergamo"},{code:"BDS",title:"Brindisi – Salento Airport",city:"Brindisi"},{code:"AHO",title:"Alghero-Fertilia Airport",city:"Alghero"},{code:"AOI",title:"Ancona Falconara Airport",city:"Ancona"},{code:"TSF",title:"Treviso-Sant'Angelo Airport",city:"Treviso"},{code:"CUF",title:"Cuneo International Airport",city:"Cuneo"},{code:"TRS",title:"Trieste–Friuli Venezia Giulia Airport",city:"Trieste"},{code:"RMI",title:"Federico Fellini International Airport",city:"Rimini"},{code:"REG",title:"Reggio Calabria Airport",city:"Reggio Calabria"},{code:"BZO",title:"Bolzano Airport",city:"Bolzano"},{code:"CIA",title:"Ciampino–G. B. Pastine International Airport",city:"Rome"},{code:"EBA",title:"Marina Di Campo Airport",city:"Marina Di Campo"},{code:"PEG",title:"Perugia San Francesco d'Assisi – Umbria International Airport",city:"Perugia"}]}}]);