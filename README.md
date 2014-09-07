In order to run the Sails.js web application a number of dependencies must first be installed. All of these are readily available but since some their binaries are quite large, it does not make sense to provide them with the project's source code. These dependencies are:


1. Bitcoind

We can obtain the bitcoind source code from the Bitcoin core developers GitHub account:

	git clone https://github.com/bitcoin/bitcoin.git

To install bitcoind we run the following commands:

	cd bitcoin
	./autogen.sh
	./configure
	make

To launch the client we then run:

	./bitcoind -testnet

For safety we may want to set testnet as default. To do this we include \begin{lstlisting}

	testnet=1

For Linux:

	~/.config/bitcoin

For Mac OSX:

	~/Library/Application Support/bitcoin

Bitcoind must be running for this projects web application to behave correctly.


2. Counterpartyd

Bitcoind should be installed prior to Counterpartyd. Counterpartyd, the Counterparty daemon, can be found on the the Counterparty GitHub page. To get the source code, run:

	git clone https://github.com/CounterpartyXCP/counterpartyd.git

Like bitcoind it is important to run this in testnet mode. This can be done using as follows: 

	./counterpartyd.py --testnet server

Alternatively we can set tesnet as default. To do this we include:

	--testnet=1

in the coutnerpartyd.conf file, which can be found in the following locations:

For Linux:

	/.config/counterparty

For Mac OSX:

	~/Library/Application Support/counterpartyd

Counterpartyd must be running for this projects web application to behave correctly. Also note that counterpartyd needs to parse the entire bitcoin blockchain which can take quite sometime (in our experience on the order of days when it is first run). \\

3. Mysqld

MySQL is an opensource relational database management system and is easily downloaded from www.dev.mysql.com/downloads/mysql/. After downloading the MySQL daemon, mysqld can be launched (on Mac OSX) as follows: 

	cd /usr/local/mysql/bin
	./mysqld_safe

Mysqld must be running for this projects web application to behave correctly.


4. Node.js

Node.js is a platform built on Chrome's JavaScript runtime. It is free to download from www.nodejs.org. Once downloaded it can be used on the command line using the command node. Node's package manager, npm, comes bundled with the install.

5. Sails

After node.js has be installed, it is trivial to install Sails.js. Only one command is required:

	sudo npm install sails -g

