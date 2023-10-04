create view vCountryCity
as
select co.name + ' - ' + ci.name Name from Country co
join City ci on co.id = ci.CountryId

select Name from vCountryCity