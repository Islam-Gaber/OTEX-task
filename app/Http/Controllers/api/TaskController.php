<?php

namespace App\Http\Controllers\api;
use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    use apiResponseTrait;
    public function create(TaskRequest $request)
    {
        DB::beginTransaction();
        //date_default_timezone_set('Africa/Cairo');
        try {
            $data = Task::create([
                    'user_id'             => $request->user()->id,
                    'title'               => $request->title,
                    'description'         => $request->description,
            ]);
            DB::commit();
            if ($data) {
                return $this->apiResponse('Record created', [], new TaskResource($data), [], 201);
            } else {
                return $this->apiResponse('Application error please try again', [], $data, [], 400);
            }
        } catch (\Throwable $th) {
            DB::rollback();
            return $this->apiResponse('Application error please try again', [], $th, [], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function records(Request $request)
    {
        $order = $request->order;
        if (!$order) {
            $order = ['type' => 'id', 'order' => 'desc'];
        }
        $page = $request->page;
        if (!$page) {
            $pagination = ['page' => 1, 'perpage' => 10];
        } else {
            $pagination = ['page' =>  $page, 'perpage' => 10];
        }
        #search
        $search = $request->search;
        $query = Task::where('state', '!=', 'delete');
        if ($search) {
            $query =  $query->where(function ($query) use ($search) {
                $query->where('title', 'like', '%' . $search['title'] . '%');
            });
        }
        #filter
        $filter = $request->filter;
        if ($filter) {
            foreach ($filter as $key => $value) {
                $query = $query->where($key, $value);
            }
        }
        $total = $query->count();

        #order and paging
        $data = $query->offset($pagination['perpage'] * ($pagination['page'] - 1))->take($pagination['perpage'])->orderBy($order['type'], $order['order'])->get();



        $pagination['total'] = $total;
        $pagination['pages'] = ceil($total / $pagination['perpage']);
        $meta = array_merge($pagination, $order);
        //return data
        return $this->apiResponse('records', $meta, TaskResource::collection($data), [],   200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function record($id)
    {
        //get record data
        $data = Task::where('state', '!=', 'delete')->where('id', $id)->first();

        // check for return data
        if ($data) {
            return $this->apiResponse('Record', [], new TaskResource($data), [], 200);
            // return error record not found
        } else {
            return $this->apiResponse('This record not found', [], [], [], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //date_default_timezone_set('Africa/Cairo');
        $data = Task::find($id);
        if ($data) {
            DB::beginTransaction();
            try {

                $data->update([
                    'title'               => $request->title,
                    'description'         => $request->description,
                ]);
                DB::commit();
                return $this->apiResponse('Record updated', [], new TaskResource($data), [], 201);
            } catch (\Throwable $th) {
                DB::rollback();
                return $this->apiResponse('Record not found', [], $th, [], 400);
            }
        } else {
            return $this->apiResponse('Record not found', $data, [], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        DB::beginTransaction();
        try {
            $data = Task::where('id', $id)->update(['state' => 'delete']);
            DB::commit();
            if ($data) {
                return $this->apiResponse('Record deleted', [], [], 201);
            } else {
                return $this->apiResponse('Error', [], $data, [], 400);
            }
        } catch (\Throwable $th) {
            DB::rollback();
            return $this->apiResponse('Error', [], $th, [], 400);
        }
    }
}
