import { useState } from "react";
import { useContextQuoteDays } from "../context/ContextQuoteDays";
import * as Utils from "@/app/util/utils";
import { useContextMainModal } from "../context/ContextMainModal";

export default function Header() {

	const { quoteDays, setQuoteDays } = useContextQuoteDays();
	const { mainModal, setMainModal } = useContextMainModal();	
	const [ settingNavDisplay, setSettingNavDisplay ] = useState( 'hide' );

	const changeSettingNavDisplay = () => {
		if ( settingNavDisplay === 'hide' ) setSettingNavDisplay( 'show' );
		else if ( settingNavDisplay === 'show' ) setSettingNavDisplay( 'hide' );
	};

	const showMainModalWithData = ( dataVal: string ) => {
		setMainModal( { show: true, data: { infoStr: 'Content Template specified from gitHub config file?' } } );
	};

	return (
	 <header className="bg-blue-950 text-white flex flex-col">
		<div className="mx-auto w-full flex items-center justify-between p-1">
		  <div className="flex flex-row">
			 <div className="mr-2 text-2xl uppercase tracking-wider">Stock</div>
			 <div className="text-secondary flex flex-col text-xs font-semibold uppercase">
				<span>Index</span>
				<span>Market</span>
			 </div>
		  </div>
  
		  <div className="ml-3 flex-1 flex justify-end"><div className="mr-3 cursor-pointer hover:bg-blue-500 p-1 text-sm" onClick={changeSettingNavDisplay}>NAV</div></div>
		</div>
		{ ( settingNavDisplay === 'show') && 
		<div className="w-full bg-black text-gray-400 text-xs p-1 flex"> 
			<div>quoteDays: <input className="p-1 w-5 h-4 text-black" 
				value={ quoteDays } 
				onChange={ (e) => { setQuoteDays( parseInt(e.target.value ) ); } }></input> days</div> 
			<div className="ml-2 text-xs text-gray-500">{Utils.getDatesRangeStr(quoteDays)}</div>
			<div className="hover:text-orange-400 cursor-pointer ml-2" onClick={() => { showMainModalWithData( '' ); }}>Template</div>
		</div>
		}
	 </header>
	  );
};