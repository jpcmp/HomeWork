select store_id
,city.city
,country.country
from sakila.store
join sakila.address on store.address_id = address.address_id
join sakila.city on address.city_id = city.city_id
join sakila.country on country.country_id = city.country_id