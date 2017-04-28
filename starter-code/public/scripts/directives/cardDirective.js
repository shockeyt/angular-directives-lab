angular.module('CardsAgainstAssembly')
	.directive('wdiCard', wdiCard);


//html converts camelCase to snake-case, so wdiCard becomes wdi-card
function wdiCard() {
	let directive = {
		restrict: 'E',
		replace: true,
		templateUrl: "templates/cardDirective.html",
		scope: {
			question: '@'
		}
	};
	return directive;
}