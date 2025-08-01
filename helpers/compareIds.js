const compareIds = (id1, id2) => {
  const missingInId2 = id1.filter(id => !id2.includes(id));
  const missingInId1 = id2.filter(id => !id1.includes(id));

  return {
    data1 :{
        message: "present in legis but not in tunecutter",
        missingInId2 // present in legis but not in tunecutter
    },
    data2: {
        message: "present in tunecutter but not in legis",
        missingInId1  // present in tunecutter but not in 
    }
  };
};


module.exports = compareIds;