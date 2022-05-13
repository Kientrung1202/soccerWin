const dbLoad = require("../utils/dbLoad");
const loadQuery = dbLoad.loadQuery;
const schedule = async (req, res) => {
    // lay tran gan nhat sap toi da len lich thi dau
    const queryNext = `select thidau.IDseason, thidau.competitionName, thidau.fieldID, Day(thidau.Start) as day, Month(thidau.Start) as month, Year(thidau.Start) as year, HOUR(thidau.Start) as start,HOUR(thidau.End) as end , field.fieldName, field.location, season.nameSeason  from thidau
    left join season on thidau.IDseason = season.IdSeason 
    inner join field on thidau.fieldId = field.fieldId
    where thidau.result is null
    order by datediff(thidau.start, now()) limit 1;`;
    const nextMatch = await loadQuery(queryNext);
    console.log(nextMatch, "nextMatch");
    const queryLast = `select thidau.*, field.fieldName, field.location,  season.nameSeason  from thidau
    left join season on thidau.IDseason = season.IdSeason 
    inner join field on thidau.fieldId = field.fieldId
    where Result is not null
    order by  datediff(now(),thidau.start) limit 3;`
    const lastMatch = await loadQuery(queryLast);
    console.log(lastMatch, "lastMatch");
    const queryEmpty = `select Day(Start) as day, Dayname(Start) as dayname, Month(Start) as month, Year(Start) as year, HOUR(Start) as start,HOUR(End) as end from thidau where competitionName is null order by start limit 4;`;
    const emptyMatch = await loadQuery(queryEmpty);
    console.log(emptyMatch, "emptyMatch");
    const trainQuery = `select luyentap.context, Day(luyentap.start) as day, month(luyentap.start) month, year(luyentap.start) year, hour(luyentap.start) as hour, field.fieldName, field.location 
    from luyentap inner join field on luyentap.fieldID = field.fieldID;`;
    const trainMatch = await loadQuery(trainQuery);
    console.log(trainMatch, "trainMatch");
    res.render('pages/schedule', {
        nextMatch,
        lastMatch,
        emptyMatch,
        trainMatch
    })
}
const team = async (req, res) => {
    const query = `select * from player`;
    const result = loadQuery(query);
    res.render('pages/team', {
        players: result
    })
}
module.exports = {
    schedule,
    team
}