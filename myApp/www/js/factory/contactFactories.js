(function () {
	var contactFactory = function($http) {
		var factory = {};
		var contacts = [{'name':'shashi', 'id':'1', 'mobile':'9910927718','age':'25','work':'developer','email':'s@gmail.com'},
						{'name':'kramer', 'id':'2', 'mobile':'4934974892','age':'21','work':'vella','email':'k@gmail.com'},
						{'name':'chandler', 'id':'3', 'mobile':'79472321','age':'32','work':'joker','email':'c@gmail.com'},
						{'name':'goerge', 'id':'4', 'mobile':'32142132321','age':'25','work':'busy','email':'g@gmail.com'},
						{'name':'jeffery', 'id':'5', 'mobile':'4543533432','age':'12','work':'sex addict','email':'j@gmail.com'},
						{'name':'joey', 'id':'6', 'mobile':'56453543523','age':'32','work':'actor','email':'jt@gmail.com'},
						{'name':'elaine', 'id':'7', 'mobile':'4645734525','age':'43','work':'officer','email':'e@gmail.com'},
						{'name':'ross', 'id':'8', 'mobile':'2344343523','age':'42','work':'doctor','email':'r@gmail.com'},
						{'name':'sheldon', 'id':'9', 'mobile':'3254343533','age':'14','work':'scientist','email':'sc@gmail.com'},
						{'name':'winter soilder', 'id':'10', 'mobile':'3452323634','age':'14','work':'druknker','email':'ws@gmail.com'},				
						{'name':'hulk', 'id':'11', 'mobile':'6785676','age':'25','work':'hitter','email':'h@gmail.com'},
						{'name':'iron man', 'id':'12', 'mobile':'745747574574','age':'21','work':'playboy','email':'im@gmail.com'},
						{'name':'captain america', 'id':'13', 'mobile':'34646436346','age':'32','work':'soilder','email':'ca@gmail.com'},
						{'name':'black widow', 'id':'14', 'mobile':'34653643634','age':'25','work':'sexy','email':'bw@gmail.com'},
						{'name':'thor', 'id':'15', 'mobile':'3425235346457','age':'12','work':'body builder','email':'t@gmail.com'},
						{'name':'loki', 'id':'16', 'mobile':'6679678657568','age':'32','work':'fool','email':'l@gmail.com'},
						{'name':'superman', 'id':'17', 'mobile':'2353625','age':'43','work':'macho','email':'kk@gmail.com'},
						{'name':'batman', 'id':'18', 'mobile':'3534632','age':'42','work':'smart','email':'b@gmail.com'}];


		factory.getContactDetails = function() {
			return contacts;
		};

		return factory;
	};

	angular.module('starter')
	.factory('contactFactory', contactFactory);
}());