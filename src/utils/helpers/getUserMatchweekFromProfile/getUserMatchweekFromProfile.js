export default (userSeason, matchweekNumber) => {
  let matchweekFiltered = null;
  if (userSeason && userSeason.matchweeks)
    matchweekFiltered = userSeason.matchweeks.filter(
      (matchweek) => matchweek.number.toString() === matchweekNumber.toString()
    );
  if (matchweekFiltered && matchweekFiltered.length > 0) matchweekFiltered = matchweekFiltered[0];
  return matchweekFiltered;
};
