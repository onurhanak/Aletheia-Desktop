db.serialize(function () {
    db.each('SELECT * FROM updated', function (err, row) {
      console.log('User: ', row.athlete_id, row.name, row.surname);
    });
  });