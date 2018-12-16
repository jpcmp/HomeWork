select address.address
,sum(amount)
from sakila.payment
join staff on payment.staff_id = staff.staff_id
join store on staff.store_id = store.store_id
join address on store.address_id = address.address_id

group by address.address
