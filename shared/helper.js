export function dataManipulator(list) {
  let activeList = [];
  let confirmedList = [];
  let fatalitiesList = [];
  let recoveriesList = [];
  list.map((item) =>
    activeList.push({ activeList: item.Active, date: item.Date })
  );
  list.map((item) =>
    confirmedList.push({ confirmedList: item.Confirmed, date: item.Date })
  );
  list.map((item) =>
    fatalitiesList.push({ fatalitiesList: item.Deaths, date: item.Date })
  );
  list.map((item) =>
    recoveriesList.push({ recoveriesList: item.Recovered, date: item.Date })
  );

  let activeCasesObj = {
    name: "Active Cases",
    data: activeList,
  };

  let confirmedCasesObj = {
    name: "Confirmed Cases",
    data: confirmedList,
  };

  let fatalitiesCasesObj = {
    name: "Fatal Cases",
    data: fatalitiesList,
  };

  let recoveriesCasesObj = {
    name: "Recovered Cases",
    data: recoveriesList,
  };

  return {
    activeCasesObj,
    confirmedCasesObj,
    fatalitiesCasesObj,
    recoveriesCasesObj,
  };
}
