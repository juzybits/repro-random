module repro::repro;

use sui::{
    random::{Random, new_generator},
};

public struct Counter has key, store {
   id: UID,
   count: u64,
}

public fun new(
   ctx: &mut TxContext,
): Counter {
   Counter {
      id: object::new(ctx),
      count: 0,
   }
}

entry fun increase_counter(
   counter: &mut Counter,
   r: &Random,
   ctx: &mut TxContext,
) {
  let mut rg = new_generator(r, ctx);
  counter.count = counter.count + rg.generate_u64_in_range(1, 10);
}
