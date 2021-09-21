exports.seed = function(knex) {
 
    return knex('items').insert([
      {item_name: 'steak', user_id: 1, event_id: 2},
      {item_name: 'chicken', user_id: 2, event_id: 3},
      {item_name: 'pork', user_id: 3, event_id: 1}
    ]);
};