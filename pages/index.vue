<template>
  <div class="min-h-screen bg-gray-100 flex flex-row flex-wrap items-center justify-center">
    <div class="flex flex-row flex-wrap items-center flex-grow">
      <div class="w-full">
        <div class="mx-auto py-6 sm:px-6 lg:px-8" style="max-width: 1700px;">
          <div class="max-w-none mx-auto flex flex-row justify-start items-start">
            <nav class="w-1/6 pr-4">
              <div
                v-for="(sample, key) in samples"
                :key="key"
                @click="loadSample(key)"
                class="cursor-pointer group flex items-center justify-end px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                aria-current="page"
              >
                <span class="truncate">{{key}}</span>
              </div>
            </nav>
            <div class="w-5/6 bg-white overflow-hidden sm:rounded-lg sm:shadow">
              <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                <div
                  class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap"
                >
                  <div class="ml-4 mt-2">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Schema Sandbox</h3>
                  </div>
                  <div class="ml-4 mt-2 flex-shrink-0">
                    <span class="inline-flex rounded-md shadow-sm">
                      <button
                        type="button"
                        @click="() => process()"
                        class="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray focus:border-gray-700 active:bg-gray-700"
                      >Run</button>
                    </span>
                  </div>
                </div>
              </div>
              <div class="w-full flex flex-row flex-wrap">
                <div class="w-2/4 flex flex-row flex-wrap">
                  <div class="w-full bg-green-500 p-2 text-white text-xs">Schema</div>
                  <MonacoEditor
                    class="editor w-full overflow-visible"
                    style="height: 300px;"
                    v-model="schema"
                    language="json"
                  />
                </div>
                <div class="w-2/4">
                  <div class="w-full bg-green-600 p-2 text-white text-xs">Input</div>
                  <MonacoEditor
                    class="editor w-full overflow-visible"
                    style="height: 300px;"
                    v-model="input"
                    language="json"
                  />
                </div>
              </div>
              <div class="w-full flex flex-row flex-wrap">
                <div class="w-2/4 flex flex-row flex-wrap">
                  <div class="w-full bg-blue-500 p-2 text-white text-xs">Output</div>
                  <MonacoEditor
                    class="editor w-full overflow-visible"
                    style="height: 300px;"
                    v-model="output"
                    language="json"
                  />
                </div>
                <div class="w-2/4 flex flex-row flex-wrap justify-start">
                  <!-- <div class="w-full bg-blue-600 p-3 text-white">Infos</div> -->
                  <div class="w-full">
                    <div class="w-full bg-gray-600 p-2 text-white text-xs">Informations</div>
                    <dl>
                      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm leading-5 font-medium text-gray-500">Input Value</dt>
                        <dd
                          class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
                        >{{inputValue || '-'}}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm leading-5 font-medium text-gray-500">Output Value</dt>
                        <dd
                          class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
                        >{{outputObj.value || '-'}}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm leading-5 font-medium text-gray-500">Sanitized</dt>
                        <dd
                          class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
                        >{{ typeof outputObj.sanitized === undefined ? '-' : outputObj.sanitized}}</dd>
                      </div>
                    </dl>
                  </div>
                  <div class="w-full">
                    <div
                      class="w-full bg-gray-600 p-2 text-white text-xs"
                      :class="{'bg-red-600': outputObj.valid === false}"
                    >Errors</div>
                    <dl v-if="outputObj && Array.isArray(outputObj.errors)">
                      <div
                        v-for="error of outputObj.errors"
                        :key="error.message"
                        class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                      >
                        <dt class="text-sm leading-5 font-medium text-gray-500">{{error.type}}</dt>
                        <dd
                          class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
                        >{{error.message}}</dd>
                      </div>
                    </dl>
                    <dl v-else>
                      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm leading-5 font-medium text-gray-500">-</dt>
                        <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">-</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { samples } from "./samples";

import fauna from "faunadb";
const q = fauna.query;
import MonacoEditor from "vue-monaco";
const db = new fauna.Client({ secret: process.env.FAUNA_KEY });

export default {
  components: {
    MonacoEditor
  },
  data() {
    return {
      samples,
      schema: ``,
      input: ``,
      output: ``
    };
  },
  mounted() {
    this.schema = localStorage.getItem("schema") || ``;
    this.input = localStorage.getItem("input") || ``;
    this.output = localStorage.getItem("output") || ``;
  },
  methods: {
    loadSample(name) {
      if (samples[name]) {
        this.schema = JSON.stringify(samples[name].schema, null, 2);
        this.input = JSON.stringify(samples[name].input, null, 2);
        this.output = "";
      }
    },
    async process() {
      this.output = "";
      console.log("Running query..");
      try {
        console.log("this.input", this.input);
        const results = await db.query(
          q.Call(
            "biota.SchemaValidate",
            {},
            {
              value: JSON.parse(this.input),
              options: {
                validate: JSON.parse(this.schema)
              },
              state: {}
            }
          )
        );

        console.log("Done with:", results);
        this.output = JSON.stringify(results.response, null, 2);
      } catch (error) {
        console.error(error);
      }
    }
  },
  computed: {
    inputValue() {
      try {
        return JSON.parse(this.input);
      } catch (error) {
        return {};
      }
    },
    outputObj() {
      try {
        return JSON.parse(this.output);
      } catch (error) {
        return {};
      }
    }
  },
  watch: {
    schema(schema) {
      localStorage.setItem("schema", schema);
    },
    input(input) {
      localStorage.setItem("input", input);
    },
    output(output) {
      localStorage.setItem("output", output);
    }
  }
};
</script>

<style>
</style>
