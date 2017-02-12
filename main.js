require('prototype.spawn')();
var roleHarvester=require('role.harvester')
var roleUpgrader=require('role.upgrader')
var roleBuilder=require('role.builder')
module.exports.loop=function(){
  console.log('--------------Beginning of current tick--------------')
  for(var name in Memory.creeps){
    if(!Game.creeps[name]){
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory: ',name );
    }
  }
  var numberOfCreeps=0;
  for(var name in Game.creeps){
    var creep=Game.creeps[name];
    if(!creep.my){
      return;
    }
    numberOfCreeps++;
  }
  console.log('Number of creeps: '+numberOfCreeps);
  for(var name in Game.spawns){
    var energy=Game.spawns[name].room.energyAvailable;
    console.log('Room "'+name+'" has '+energy+' energy');
  }
  console.log('Number of creeps: '+numberOfCreeps);
  var MaxNumCreeps=10;
  var minNumHarvesters=6;
  var minNumUpgraders=2;
  var minNumBuilders=2;

  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  console.log('Harvesters : ' + harvesters.length);


  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  console.log('Upgraders : '+ upgraders.length);


  var builders = _.filter(Game.creeps,(creep) => creep.memory.role == 'builder');
  console.log('Builders : '+ builders.length);

  if(numberOfCreeps < MaxNumCreeps){
    if (harvesters.length < minNumHarvesters) {
      // try to spawn one
      name = Game.spawns['Spawn1'].createCustomCreep(energy, 'harvester');

      // if spawning failed and we have no harvesters left
      if (name == ERR_NOT_ENOUGH_ENERGY && harvesters == 0) {
        // spawn one with what is available
        name = Game.spawns['Spawn1'].createCustomCreep(
          Game.spawns['Spawn1'].room.energyAvailable, 'harvester');
        }
      }
      // if not enough upgraders
      else if (upgraders.length < minNumUpgraders ) {
        // try to spawn one
        name = Game.spawns['Spawn1'].createCustomCreep(energy, 'upgrader');
      }
      else if (builders.length < minNumBuilders ) {
        // try to spawn one
        name = Game.spawns['Spawn1'].createCustomCreep(energy, 'builder');
      }
      else{
        // else try to spawn a builder
        name = Game.spawns['Spawn1'].createCustomCreep(energy, 'harvester');
      }
      if(!(name<0)){
        console.log('Spawned new creep: '+name);
      }
    }

    for(var name in Game.creeps){
      var creep = Game.creeps[name];
      if(creep.memory.role=='harvester') roleHarvester.run(creep);
      if(creep.memory.role=='upgrader') roleUpgrader.run(creep);
      if(creep.memory.role=='builder') roleBuilder.run(creep);
      //if(creep.memory.role == 'transporter') roleTransporter.run(creep);
      //if(creep.memory.role=='miner') roleMiner.run(creep);
      //if(creep.memory.role=='hauler') roleHauler.run(creep);
      //if(creep.memory.role=='repairer')roleRepairer.run(creep);
    }
    console.log('-----------------End of current tick-----------------');
}
