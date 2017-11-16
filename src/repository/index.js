export default class Repository {
  constructor() {
    this.entities = {};
    this.components = {};
    this.entityCounter = 0;
  }

  putEntity(entity) {
    if (!entity._id) entity._id = entityCounter++;
    this.entities[entity._id] = entity;
    return entity._id;
  }

  removeEntity(entity) {
    delete this.entities[entity._id];
  }

  getEntityById(_id) {
    return this.entities[_id];
  }

  attachComponentToEntity(component, entity) {
    let _entityId, _componentId;
    if (entity._id !== undefined && Number.isInteger(entity._id)) {
      _entityId = entity._id;
    } else {
      _entityId = entity;
    }

    if (this.components[_componentId] === undefined) {
      this.components[_componentId] = [];
    }

    this.components[_componentId].push(entity._id);
  }

  removeComponentFromEntity(component, entity) {
    throw 'Not yet implemented';
  }

  getEntitiesByComponentId(_id) {
    return this.components(_id);
  }
}
