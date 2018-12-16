select first_name
,last_name
,address.address

from staff
join sakila.address on address.address_id = staff.address_id
