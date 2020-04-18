# BuzzFair

An updated application for the Georgia Tech College of Computing (CoC) career fair

## Release Notes - Version BuzzFair 1.0
### NEW FEATURES
* Added user notes for each company
	* Notes are persistent for registered accounts

* Users are able to log out of their accounts by selecting from the dropdown

* Improvements to the application color scheme
### BUG FIXES
* Editing company data now immediately updates the client

* Formatting of company entries no longer changes on edit
	* Heart icon is now visible after edit
	* Text is aligned after edit
### KNOWN BUGS
* N/A

## Install Guide - BuzzFair 1.0
### PRE-REQUISITES
* You must have Node.js version 8.11.0 or above. 
	* See https://nodejs.org/en/download/ 
	* npm is distributed with Node.js (when Node.js is downloaded, npm is automatically installed)
### DEPENDENCIES
* All of the following dependencies can be installed through npm. See the INSTALLATION section for details on automatic installation.

* Client Dependencies
	* @material-ui/core: version 4.9.0 or above
	* @material-ui/icons: version 4.5.1 or above
	* d3: version 5.15.0 or above
	* react: version 16.12.0 or above
	* react-bootstrap: version 1.0.0-beta.16 or above
	* react-dom: version 16.12.0 or above
	* react-redux: version 7.1.3 or above
	* react-router-dom: version 5.1.2 or above
	* react-scripts: version 3.3.1 or above
	* redux: version 4.0.5 or above
* Server Dependencies
	* body-parser: version 1.19.0 or above
	* express: version 4.17.1 or above
	* mongoose: version 5.8.7 or above
	* multer: version 1.4.2 or above
	* sha2: version 1.0.2 or above
### DOWNLOAD
* https://github.com/wange011/career_fair_app
	* Download both “client” and “server” folders
### BUILD
* No build is necessary for this application. Executable scripts already exist in both the “client” and “server” folders.

### INSTALLATION
* Navigate to the location where you downloaded the “client” folder
	* Launch a terminal window here and run: `npm install`
	* This will install all the dependencies for the client.

* Navigate to the location where you downloaded the “server” folder
	* Launch a terminal window here and run: `npm install`
	* This will install all the dependencies for the server.
### RUNNING APPLICATION
* Navigate to the location where you downloaded the “client” folder
	* Launch a terminal window here and run: `npm start`

* Navigate to the location where you downloaded the “server” folder
	* Launch a terminal window here and run: `node index.js`

* The client is accessible at the web domain <your_ip_adress>:3000 and the server is accessible at the web domain <your_ip_adress>:5000
	* To find your ip address on Windows, launch a terminal window and run: `ipconfig`
		* The ip address is located next to the “IPv4 Address” entry 
	* To find your ip address on Mac OS X , launch a terminal window and run: `ifconfig`
		* The ip address is located next to the last “inet” entry 
	* To find your ip address on Linux, launch a terminal window and run: `ifconfig`
		* The ip address is located next to the first “inet” entry 
### TROUBLESHOOTING
* If the terminal outputs: `Cannot find module <module_name>`
	* Ensure that all dependencies are installed by running: `npm install`
	* Otherwise, you can manually install dependencies by running: `npm install <module_name>`

* If the terminal outputs: `Port 5000 is already in use`
	* An application is already using Port 5000 on the local computer. Either:
		1. Close that other application
		or
		2. Change the value of port in index.js of the “server” folder 



