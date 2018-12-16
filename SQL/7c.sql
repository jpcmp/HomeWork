select first_name ,last_name ,email from sakila.customer where address_id in (
select address_id from sakila.address where city_id in(
select city_id from sakila.city where country_id in (
select country_id from sakila.country where country = 'Canada')))