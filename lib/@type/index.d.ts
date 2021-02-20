// Type definitions for lib/front-debugger.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped
// FrontDebugger.!0

/**
 * 
 */
declare interface 0 {
		
	/**
	 * 
	 */
	speed : number;
		
	/**
	 * 
	 */
	style : boolean;
		
	/**
	 * 
	 */
	parent : string;
		
	/**
	 * 
	 */
	className : string;
		
	/**
	 * 
	 * @return  
	 */
	test(): boolean;
}

/**
 * 
 */
declare interface FrontDebugger {
		
	/**
	 * 
	 * @param options 
	 */
	new (options : any);
		
	/**
	 * 
	 * @param text 
	 */
	log(text : any): void;
		
	/**
	 * 
	 * @param text 
	 */
	frontLog(text : any): void;
}
