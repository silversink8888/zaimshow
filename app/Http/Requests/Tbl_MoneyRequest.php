<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Tbl_MoneyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
//        return false;
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
		//	'buy_date' => 'required|string|max:20',
			'buy_date' => 'date',
			'item_name' => 'required|string|max:20',
		//　 'name' => 'required|string|max:20',
			'price' => 'required|integer',
			'memo' => 'nullable',

        ];
    }
}
