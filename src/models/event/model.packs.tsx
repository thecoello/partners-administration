export default class Packs {
  packinfo?: Array<_Packinfo>
  locations?: Array<_Locations>
}

class _Packinfo{
    id?: number
    pack_name?: string
    price_normal?: number
    price_early?: number
    price_all_normal?: number
    price_all_early?: number
}

class _Locations{
    id?: number
    location_name?: string
    type?: number
}