module.exports = function() {
  // create a new function for StructureSpawn
  StructureSpawn.prototype.createCustomCreep =
  function(energy, roleName) {
    // create a balanced body as big as possible with the given energy

    var body = [];
    if(roleName=='miner'){
      body.push(MOVE);
      var numberOfParts = Math.floor((energy-50) / 100);
      for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
      }
    }
    if(roleName=='upgrader' || roleName=='builder' || roleName=='harvester' || roleName=='repairer'){
      var numberOfParts=Math.floor(energy / 200);
      for(let i=0; i<numberOfParts; i++){
        body.push(WORK);
      }
      for(let i=0; i<numberOfParts; i++){
        body.push(CARRY);
      }
      for(let i=0; i<numberOfParts; i++){
        body.push(MOVE);
      }
    }

    if(roleName=='hauler'){
      var numberOfParts=Math.floor(energy/150);
      for(let i=0; i<numberOfParts; i++){
        body.push(MOVE);
      }
      for(let i=0; i<numberOfParts; i++){
        body.push(CARRY);
      }
    }
    if(roleName=='archer'){
      var numberOfParts=Math.floor(energy/200);
      for(let i=0; i<numberOfParts; i++){
        body.push[RANGED_ATTACK];
      }
      for(let i=0; i<numberOfParts; i++){
        body.push[MOVE];
      }
    }



    // create creep with the created body and the given role
    return this.createCreep(body, undefined, { role: roleName});
  };
};
