import { useState } from "react";
import { useContextQuoteDays } from "../context/ContextQuoteDays";
import * as Utils from "@/app/util/utils";
import Modal from "./common/modal";

export default function Header() {

	const { quoteDays, setQuoteDays } = useContextQuoteDays();
	const [ settingNavDisplay, setSettingNavDisplay ] = useState( 'hide' );
	const [ showEvalModal, setShowEvalModal ] = useState<boolean>(false);

	const changeSettingNavDisplay = () => {
		if ( settingNavDisplay === 'hide' ) setSettingNavDisplay( 'show' );
		else if ( settingNavDisplay === 'show' ) setSettingNavDisplay( 'hide' );
	};

	const modalClose = () => setShowEvalModal(false);

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
  
		  <div className="ml-3 flex-1 flex justify-end"><div className="mr-3 cursor-pointer" onClick={changeSettingNavDisplay}>NAV</div></div>
		</div>
		{ ( settingNavDisplay === 'show') && 
		<div className="w-full bg-black text-gray-400 text-xs p-1 flex"> 
			<div>quoteDays: <input className="p-1 w-5 h-4 text-black" 
				value={ quoteDays } 
				onChange={ (e) => { setQuoteDays( parseInt(e.target.value ) ); } }></input> days</div> 
			<div className="ml-2 text-xs text-gray-500">{Utils.getDatesRangeStr(quoteDays)}</div>
			<div className="hover:text-orange-400 cursor-pointer ml-2" onClick={() => { setShowEvalModal(true); }}>Template</div>
			<Modal isVisible={showEvalModal} onClose={modalClose} className="z-10">
				<div className="w-10/12 h-5/6 bg-white rounded-lg shadow-lg p-2 flex flex-col justify-start items-start">
					<div><h2 className="font-semibold text-gray-600 mb-3">Stock Quotes Summary:</h2></div>
					<div className="flex-1">
						Content Template specified from gitHub config file?
					</div>
					<div className="pl-4">
							<button className="rounded-lg p-2 bg-blue-400 m-2 text-white" onClick={modalClose}>Close</button>
					</div>
				</div>
			</Modal>
		</div>
		}
	 </header>
	  );
};