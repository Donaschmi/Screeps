roleRefiller=require('role.refiller')
var roleRepairer={
  /** @param {Creep} creep**/
  run:function(creep){
    if(creep.memory.repairing && creep.energy == 0){
      creep.memory.repairing=false;
      creep.say('collecting');
    }
    if(!creep.memory.repairing && creep.carry.energy > creep.carryCapacity*0.5){
      creep.memory.repairing=true;
      creep.say('repairing');
    }
    if(creep.memory.repairing){
      var targets =creep.room.find(FIND_STRUCTURES,
        {filter:function(structure){
          return (structure.structureType==STRUCTURE_ROAD && structure.hits<structure.hitsMax*0.75)
        }});
        if(targets.length){
          target =creep.pos.findClosestByRange(targets);
          if(creep.repair(target)==ERR_NOT_IN_RANGE){
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
          }
        }
        else{
          //TODO Correct this scripts so that if a repairer doesn't have a job to to, he will become a builder
          creep.memory.role='refiller'
        }
      }
      else{
        spawns =creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return ( (structure.structureType==STRUCTURE_EXTENSION&& structure.energy >0)|| (structure.structureType == STRUCTURE_SPAWN && structure.energy > 200));
          }
        });
        if(spawns.length){
          target = creep.pos.findClosestByRange(spawns)
          if(!(creep.pos.isNearTo(target))){
            creep.moveTo(target);
          }else{
            if (target.energy <creep.carryCapacity){
              creep.withdraw(target, RESOURCE_ENERGY, target.energy);
            }
            else{
              creep.withdraw(target, RESOURCE_ENERGY, (creep.carryCapacity - _.sum(creep.carry)));
            }
          }
        }
      }
    }
  };
  module.exports=roleRepairer;
