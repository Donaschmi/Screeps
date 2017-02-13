//roleBuilder=require('role.builder')
var roleRefiller={
  /** @param {Creep} creep**/
  run:function(creep){
    if(creep.memory.refilling && creep.energy == 0){
      creep.memory.refilling=false;
      creep.say('collecting');
    }
    if(!creep.memory.refilling && creep.carry.energy >= creep.carryCapacity*0.5){
      creep.memory.refilling=true;
      creep.say('refilling');
    }
    if(creep.memory.refilling){
      creep.memory.refilling=false;
      var targets =creep.room.find(FIND_STRUCTURES,
        {filter:function(structure){
          return (structure.structureType==STRUCTURE_TOWER && structure.energy<structure.energyCapacity*0.75)
        }});
        if(targets.length){
          target =creep.pos.findClosestByRange(targets);
          if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
          }
        }
        else{
          //TODO Correct this script so that if a refiller doesn't have a job to to, he will become a builder
          creep.memory.role='builder'
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
  module.exports=roleRefiller;
